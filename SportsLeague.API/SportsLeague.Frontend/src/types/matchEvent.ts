import { GoalType, CardType } from '../utils/constants';

export interface GoalRequest {
  playerId: number;
  minute: number;
  type: GoalType;
}

export interface GoalResponse {
  id: number;
  matchId: number;
  playerId: number;
  playerName: string;
  minute: number;
  type: GoalType;
  createdAt: string;
}

export interface CardRequest {
  playerId: number;
  minute: number;
  type: CardType;
}

export interface CardResponse {
  id: number;
  matchId: number;
  playerId: number;
  playerName: string;
  minute: number;
  type: CardType;
  createdAt: string;
}
