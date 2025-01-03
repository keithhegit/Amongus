export enum ClueType {
  LOCATION = 'location',
  BEHAVIOR = 'behavior',
  RELATION = 'relation',
  PROFESSION = 'profession',
  TESTIMONY = 'testimony',
  REACTION = 'reaction',
  SYSTEM = 'system'
}

export interface Clue {
  id: string;
  clue_id: string;
  main_type: ClueType;
  sub_type: string;
  clue_text: string;
  reliability: number;
  complexity: number;
  is_template: boolean;
  variables: string[];
  validation_rules: string[];
  related_professions: string[];
}

export interface Level {
  id: string;
  level_number: number;
  grid_layout: GridLayout;
  impostor_count: number;
  complexity: number;
  characters: Character[];
}

export interface GridLayout {
  columns: string[];
  rows: number[];
  maxColumns: number;
  maxRows: number;
}

export interface Character {
  position: string;
  name: string;
  identity: {
    isImpostor: boolean;
    isRevealed: boolean;
  };
  clue: {
    text: string;
    isUsed: boolean;
    isEffective: boolean;
  };
  visual: {
    avatar: string;
    background: string;
    profession?: string;
  };
}