import React from 'react';
import type { Clue } from '../types/game';
import { Badge } from './Badge';
import { getClueTypeIcon } from '../utils/clueUtils';

interface CluePanelProps {
  clue: Clue | null;
  onClose: () => void;
}

export function CluePanel({ clue, onClose }: CluePanelProps) {
  if (!clue) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">
          {getClueTypeIcon(clue.main_type)} {clue.main_type}
        </h3>
        <button onClick={onClose} className="text-gray-500">✕</button>
      </div>
      <div className="max-h-48 overflow-y-auto">
        <p className="text-base">{clue.clue_text}</p>
        <div className="flex mt-2 space-x-2">
          <Badge label={`Reliability: ${clue.reliability}/5`} color="blue" />
          <Badge label={`Complexity: ${clue.complexity}/5`} color="purple" />
        </div>
      </div>
    </div>
  );
}