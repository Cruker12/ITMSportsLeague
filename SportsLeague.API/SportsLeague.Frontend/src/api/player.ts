import apiClient from './client';
import type { PagedResult, PaginationParams } from '../types/api';
import type { PlayerRequest, PlayerResponse } from '../types/player';

const ENDPOINT = '/player';

export const playerApi = {
  getAll: (params: PaginationParams = { page: 1, pageSize: 10 }) =>
    apiClient.get<PagedResult<PlayerResponse>>(ENDPOINT, { params }),

  getById: (id: number) =>
    apiClient.get<PlayerResponse>(`${ENDPOINT}/${id}`),

  getByTeam: (teamId: number) =>
    apiClient.get<PlayerResponse[]>(`${ENDPOINT}/team/${teamId}`),

  create: (data: PlayerRequest) =>
    apiClient.post<PlayerResponse>(ENDPOINT, data),

  update: (id: number, data: PlayerRequest) =>
    apiClient.put(`${ENDPOINT}/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`${ENDPOINT}/${id}`),
};
