import React from 'react';
import type { Character } from '../types/game';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
  isSelected: boolean;
}

export function CharacterCard({ character, onSelect, isSelected }: CharacterCardProps) {
  const bgColor = character.identity.isRevealed 
    ? character.identity.isImpostor 
      ? 'bg-red-500' 
      : 'bg-green-500'
    : 'bg-blue-100 dark:bg-gray-800';

  return (
    <button 
      onClick={() => onSelect(character)}
      className={`
        relative w-full aspect-square rounded-xl 
        ${bgColor}
        ${isSelected ? 'ring-4 ring-yellow-400' : ''}
        transition-all duration-200 hover:scale-105
        shadow-lg hover:shadow-xl
      `}
    >
      {/* Position indicator */}
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
        {character.position}
      </div>

      {/* Character info */}
      <div className="absolute inset-x-2 bottom-2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg">
        <p className="font-bold text-center">{character.name}</p>
        {character.visual.profession && (
          <p className="text-xs text-center opacity-75">{character.visual.profession}</p>
        )}
      </div>

      {/* Message indicator */}
      {character.clue && !character.clue.isUsed && (
        <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <span role="img" aria-label="message">💭</span>
        </div>
      )}

      {/* Character image */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <img
          src={character.visual.avatar}
          alt={character.name}
          className="w-full h-full object-contain"
        />
      </div>
    </button>
  );
}