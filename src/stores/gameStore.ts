import { makeAutoObservable } from 'mobx';
import type { Level, Character, Clue } from '../types/game';
import { GameService } from '../services/gameService';

export class GameStore {
  currentLevel: Level | null = null;
  selectedCharacter: Character | null = null;
  mistakes: number = 0;
  isJudgmentMode: boolean = false;
  usedClues: Set<string> = new Set();
  
  private gameService: GameService;

  constructor() {
    makeAutoObservable(this);
    this.gameService = new GameService();
  }

  reset() {
    this.currentLevel = null;
    this.selectedCharacter = null;
    this.mistakes = 0;
    this.isJudgmentMode = false;
    this.usedClues.clear();
  }

  async loadLevel(levelNumber: number) {
    try {
      this.reset();
      this.currentLevel = await this.gameService.getLevel(levelNumber);
    } catch (error) {
      console.error('Failed to load level:', error);
      throw error;
    }
  }

  selectCharacter(character: Character | null) {
    this.selectedCharacter = character;
  }

  toggleJudgmentMode() {
    this.isJudgmentMode = !this.isJudgmentMode;
    if (this.isJudgmentMode) {
      this.selectedCharacter = null;
    }
  }

  makeJudgment(character: Character, isImpostor: boolean) {
    if (!this.isJudgmentMode) return false;
    
    if (character.identity.isImpostor !== isImpostor) {
      this.mistakes++;
      return false;
    }
    character.identity.isRevealed = true;
    return true;
  }

  useClue(clueId: string) {
    this.usedClues.add(clueId);
    if (this.selectedCharacter?.clue) {
      this.selectedCharacter.clue.isUsed = true;
    }
  }

  get remainingMistakes() {
    return 3 - this.mistakes;
  }

  get isGameOver() {
    return this.mistakes >= 3;
  }

  get allImpostorsRevealed() {
    return this.currentLevel?.characters.every(
      char => !char.identity.isImpostor || char.identity.isRevealed
    ) ?? false;
  }
}