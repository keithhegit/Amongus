import React from 'react';
import { Character } from '../types/game';
import { CharacterCard } from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  selectedCharacter: Character | null;
}

export function CharacterGrid({ characters, onSelect, selectedCharacter }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {characters.map((character) => (
        <CharacterCard
          key={character.position}
          character={character}
          onSelect={onSelect}
          isSelected={character === selectedCharacter}
        />
      ))}
    </div>
  );
}