import apiClient from './client';
import type { StandingDTO, TopScorerDTO, CardStatsDTO } from '../types/standings';

export const standingsApi = {
  getStandings: (tournamentId: number) =>
    apiClient.get<StandingDTO[]>('/standings', { params: { tournamentId } }),

  getTopScorers: (tournamentId: number) =>
    apiClient.get<TopScorerDTO[]>('/stats/scorers', { params: { tournamentId } }),

  getCardStats: (tournamentId: number) =>
    apiClient.get<CardStatsDTO[]>('/stats/cards', { params: { tournamentId } }),
};
