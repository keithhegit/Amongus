import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_LEVELS } from '../data/levels/index';
import { useGameProgress } from '../hooks/useGameProgress';

interface LevelCardProps {
  level: number;
  isLocked: boolean;
  onSelect: () => void;
}

function LevelCard({ level, isLocked, onSelect }: LevelCardProps) {
  return (
    <button
      onClick={onSelect}
      disabled={isLocked}
      className={`
        relative w-full aspect-square rounded-xl p-4
        ${isLocked ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
        transition-all duration-200 hover:scale-105
        shadow-lg hover:shadow-xl
      `}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {isLocked ? (
          <span className="text-4xl">🔒</span>
        ) : (
          <span className="text-white text-2xl font-bold">关卡 {level}</span>
        )}
      </div>
    </button>
  );
}

interface LevelSelectProps {
  onClose: () => void;
}

export function LevelSelect({ onClose }: LevelSelectProps) {
  const navigate = useNavigate();
  const levels = Object.keys(LOCAL_LEVELS).map(Number);
  const { maxUnlockedLevel } = useGameProgress();

  const handleLevelSelect = (level: number) => {
    navigate(`/level/${level}`);
    onClose();
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {levels.map((level) => (
        <LevelCard
          key={level}
          level={level}
          isLocked={level > maxUnlockedLevel}
          onSelect={() => handleLevelSelect(level)}
        />
      ))}
    </div>
  );
}