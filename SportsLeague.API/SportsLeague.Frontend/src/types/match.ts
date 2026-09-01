import { MatchStatus } from '../utils/constants';

export interface MatchRequest {
  tournamentId: number;
  homeTeamId: number;
  awayTeamId: number;
  refereeId: number;
  matchDate: string;
  venue: string;
  matchday: number;
}

export interface MatchResponse {
  id: number;
  tournamentId: number;
  tournamentName: string;
  homeTeamId: number;
  homeTeamName: string;
  awayTeamId: number;
  awayTeamName: string;
  refereeId: number;
  refereeFullName: string;
  matchDate: string;
  venue: string;
  matchday: number;
  status: MatchStatus;
  createdAt: string;
  updatedAt?: string | null;
}

export interface UpdateMatchStatusDTO {
  status: MatchStatus;
}

export interface MatchResultRequest {
  homeGoals: number;
  awayGoals: number;
  observations?: string | null;
}

export interface MatchResultResponse {
  id: number;
  matchId: number;
  homeGoals: number;
  awayGoals: number;
  observations?: string | null;
  createdAt: string;
}
