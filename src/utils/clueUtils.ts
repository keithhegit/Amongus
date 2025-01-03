import { ClueType } from '../types/game';

export function getClueTypeIcon(type: ClueType): string {
  const icons = {
    [ClueType.LOCATION]: '📍',
    [ClueType.BEHAVIOR]: '👀',
    [ClueType.RELATION]: '🤝',
    [ClueType.PROFESSION]: '💼',
    [ClueType.TESTIMONY]: '💭',
    [ClueType.REACTION]: '😮',
    [ClueType.SYSTEM]: '⚙️',
  };
  
  return icons[type] || '❓';
}