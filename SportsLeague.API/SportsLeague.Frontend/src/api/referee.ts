import apiClient from './client';
import type { PagedResult, PaginationParams } from '../types/api';
import type { RefereeRequest, RefereeResponse } from '../types/referee';

const ENDPOINT = '/referee';

export const refereeApi = {
  getAll: (params: PaginationParams = { page: 1, pageSize: 10 }) =>
    apiClient.get<PagedResult<RefereeResponse>>(ENDPOINT, { params }),

  getById: (id: number) =>
    apiClient.get<RefereeResponse>(`${ENDPOINT}/${id}`),

  create: (data: RefereeRequest) =>
    apiClient.post<RefereeResponse>(ENDPOINT, data),

  update: (id: number, data: RefereeRequest) =>
    apiClient.put(`${ENDPOINT}/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`${ENDPOINT}/${id}`),
};
