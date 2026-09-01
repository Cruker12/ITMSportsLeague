import { TournamentStatus } from '../utils/constants';

export interface TournamentRequest {
  name: string;
  season: string;
  startDate: string;
  endDate: string;
}

export interface TournamentResponse {
  id: number;
  name: string;
  season: string;
  startDate: string;
  endDate: string;
  status: TournamentStatus;
  teamsCount: number;
  createdAt: string;
  updatedAt?: string | null;
}

export interface UpdateStatusDTO {
  status: TournamentStatus;
}

export interface RegisterTeamDTO {
  teamId: number;
}
