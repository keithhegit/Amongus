import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { CharacterGrid } from './CharacterGrid';
import { CharacterDetail } from './CharacterDetail';
import { CluePanel } from './CluePanel';
import { JudgmentFeedback } from './JudgmentFeedback';
import { GameStatus } from './GameStatus';
import { useGame } from '../hooks/useGame';
import { useJudgment } from '../hooks/useJudgment';
import { useClueSystem } from '../hooks/useClueSystem';
import { useGameProgress } from '../hooks/useGameProgress';
import type { Character } from '../types/game';

export const GameBoard = observer(() => {
  const { levelNumber } = useParams();
  const navigate = useNavigate();
  const level = parseInt(levelNumber || '1');
  
  const { gameStore, loading, error } = useGame();
  const { feedback, handleJudgment, dismissFeedback } = useJudgment(gameStore);
  const { activeClue, showClue, hideClue } = useClueSystem(gameStore);
  const { isSaving, error: saveError } = useGameProgress(gameStore);

  useEffect(() => {
    const loadLevel = async () => {
      try {
        await gameStore.loadLevel(level);
      } catch (err) {
        console.error('Failed to load level:', err);
      }
    };
    loadLevel();
  }, [level]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading level {level}...</p>
      </div>
    );
  }

  if (error || !gameStore.currentLevel) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center p-4">
          <p className="text-lg text-red-500 mb-4">{error?.message || 'Failed to load level'}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  const handleCharacterSelect = (character: Character) => {
    gameStore.selectCharacter(character);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <CharacterGrid
          characters={gameStore.currentLevel.characters}
          onSelect={handleCharacterSelect}
          selectedCharacter={gameStore.selectedCharacter}
        />
      </div>

      {/* Judgment buttons */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          onClick={() => handleJudgment(gameStore.selectedCharacter!, false)}
          className="px-6 py-2 rounded-full font-bold bg-green-100 text-green-800 hover:bg-green-600 hover:text-white"
        >
          😊 好人
        </button>
        <button
          onClick={() => handleJudgment(gameStore.selectedCharacter!, true)}
          className="px-6 py-2 rounded-full font-bold bg-red-100 text-red-800 hover:bg-red-600 hover:text-white"
        >
          👿 坏人
        </button>
      </div>

      {gameStore.selectedCharacter && (
        <CharacterDetail
          character={gameStore.selectedCharacter}
          onClose={() => gameStore.selectCharacter(null)}
          onShowClue={showClue}
        />
      )}

      {activeClue && (
        <CluePanel
          clue={activeClue}
          onClose={hideClue}
        />
      )}

      {feedback.isVisible && (
        <JudgmentFeedback
          isCorrect={feedback.isCorrect}
          onDismiss={dismissFeedback}
        />
      )}

      <GameStatus
        isGameOver={gameStore.isGameOver}
        isVictory={gameStore.allImpostorsRevealed}
        onRestart={() => gameStore.loadLevel(level)}
        onNextLevel={() => navigate(`/level/${level + 1}`)}
      />
    </div>
  );
});