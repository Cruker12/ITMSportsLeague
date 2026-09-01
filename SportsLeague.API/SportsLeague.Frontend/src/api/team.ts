import apiClient from './client';
import type { PagedResult, PaginationParams } from '../types/api';
import type { TeamRequest, TeamResponse } from '../types/team';

const ENDPOINT = '/team';

export const teamApi = {
  getAll: (params: PaginationParams = { page: 1, pageSize: 10 }) =>
    apiClient.get<PagedResult<TeamResponse>>(ENDPOINT, { params }),

  getById: (id: number) =>
    apiClient.get<TeamResponse>(`${ENDPOINT}/${id}`),

  create: (data: TeamRequest) =>
    apiClient.post<TeamResponse>(ENDPOINT, data),

  update: (id: number, data: TeamRequest) =>
    apiClient.put(`${ENDPOINT}/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`${ENDPOINT}/${id}`),
};
