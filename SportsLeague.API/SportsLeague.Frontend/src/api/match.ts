import apiClient from './client';
import type { PagedResult, PaginationParams } from '../types/api';
import type { MatchRequest, MatchResponse, UpdateMatchStatusDTO } from '../types/match';

const ENDPOINT = '/match';

export const matchApi = {
  getByTournament: (tournamentId: number, params: PaginationParams = { page: 1, pageSize: 10 }) =>
    apiClient.get<PagedResult<MatchResponse>>(`${ENDPOINT}/tournament/${tournamentId}`, { params }),

  getById: (id: number) =>
    apiClient.get<MatchResponse>(`${ENDPOINT}/${id}`),

  create: (data: MatchRequest) =>
    apiClient.post<MatchResponse>(ENDPOINT, data),

  update: (id: number, data: MatchRequest) =>
    apiClient.put(`${ENDPOINT}/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`${ENDPOINT}/${id}`),

  updateStatus: (id: number, data: UpdateMatchStatusDTO) =>
    apiClient.patch(`${ENDPOINT}/${id}/status`, data),
};
