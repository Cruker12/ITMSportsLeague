import { PlayerPosition } from '../utils/constants';

export interface PlayerRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  number: number;
  position: PlayerPosition;
  teamId: number;
}

export interface PlayerResponse {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  number: number;
  position: PlayerPosition;
  teamId: number;
  teamName: string;
  createdAt: string;
  updatedAt?: string | null;
}
