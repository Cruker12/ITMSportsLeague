import apiClient from './client';
import type { SponsorRequest, SponsorResponse, TournamentSponsorRequest, TournamentSponsorResponse } from '../types/sponsor';

const ENDPOINT = '/sponsor';

export const sponsorApi = {
  getAll: () =>
    apiClient.get<SponsorResponse[]>(ENDPOINT),

  getById: (id: number) =>
    apiClient.get<SponsorResponse>(`${ENDPOINT}/${id}`),

  create: (data: SponsorRequest) =>
    apiClient.post<SponsorResponse>(ENDPOINT, data),

  update: (id: number, data: SponsorRequest) =>
    apiClient.put(`${ENDPOINT}/${id}`, data),

  delete: (id: number) =>
    apiClient.delete(`${ENDPOINT}/${id}`),

  addTournament: (id: number, data: TournamentSponsorRequest) =>
    apiClient.post<TournamentSponsorResponse>(`${ENDPOINT}/${id}/tournaments`, data),

  getTournaments: (id: number) =>
    apiClient.get<TournamentSponsorResponse[]>(`${ENDPOINT}/${id}/tournaments`),

  removeTournament: (id: number, tournamentId: number) =>
    apiClient.delete(`${ENDPOINT}/${id}/tournaments/${tournamentId}`),
};
