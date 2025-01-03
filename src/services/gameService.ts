import { supabase } from '../lib/supabase';
import type { Clue, Level } from '../types/game';
import { LOCAL_LEVELS } from '../data/levels/index';

export class GameService {
  async getClues(): Promise<Clue[]> {
    try {
      const { data, error } = await supabase
        .from('clues')
        .select('*');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch clues:', error);
      return [];
    }
  }

  async getLevel(levelNumber: number): Promise<Level> {
    // First try to get from local data
    const localLevel = LOCAL_LEVELS[levelNumber as keyof typeof LOCAL_LEVELS];
    if (localLevel) {
      return localLevel;
    }
    
    // If not in local data, try to get from Supabase
    try {
      const { data, error } = await supabase
        .from('levels')
        .select('*')
        .eq('level_number', levelNumber)
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error(`Level ${levelNumber} not found`);
      
      return data;
    } catch (error) {
      console.error('Failed to fetch level:', error);
      throw new Error(`Level ${levelNumber} not found. Please make sure you've connected to Supabase and run the migrations.`);
    }
  }

  async saveGameSession(userId: string, levelId: string, currentState: any, mistakes: number) {
    if (!userId) return; // Don't save if not authenticated
    
    try {
      const { error } = await supabase
        .from('game_sessions')
        .upsert({
          user_id: userId,
          level_id: levelId,
          current_state: currentState,
          mistakes
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Failed to save game session:', error);
    }
  }
}