import { useEffect, useState } from 'react';
import { GameStore } from '../stores/gameStore';
import { supabase } from '../lib/supabase';

const gameStore = new GameStore();

export function useGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Check authentication status
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        // Handle signed out state
        gameStore.reset();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const startLevel = async (levelNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      await gameStore.loadLevel(levelNumber);
    } catch (err) {
      console.error('Failed to load level:', err);
      setError(err instanceof Error ? err : new Error('Failed to load level'));
    } finally {
      setLoading(false);
    }
  };

  return {
    gameStore,
    loading,
    error,
    startLevel
  };
}