import apiClient from './client';
import type { PagedResult, PaginationParams } from '../types/api';
import type { TournamentRequest, TournamentResponse, UpdateStatusDTO, RegisterTeamDTO } from '../types/tournament';
import type { TeamResponse } from '../types/team';

const ENDPOINT = '/tournament';

export const tournamentApi = {
  getAll: (params: PaginationParams = { page: 1, pageSize: 10 }) =>
    apiClient.get<PagedResult<TournamentResponse>>(ENDPOINT, { params }),

  getById: (id: number) =>
    apiClient.get<TournamentResponse>(`${ENDPOINT}/${id}`),

  create: (data: TournamentRequest) =>
    apiClient.post<TournamentResponse>(ENDPOINT, data),

  update: (id: number, data: TournamentRequest) =>
    apiClient.put(`${ENDPOINT}/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`${ENDPOINT}/${id}`),

  updateStatus: (id: number, data: UpdateStatusDTO) =>
    apiClient.patch(`${ENDPOINT}/${id}/status`, data),

  registerTeam: (id: number, data: RegisterTeamDTO) =>
    apiClient.post(`${ENDPOINT}/${id}/teams`, data),

  getTeams: (id: number) =>
    apiClient.get<TeamResponse[]>(`${ENDPOINT}/${id}/teams`),
};
