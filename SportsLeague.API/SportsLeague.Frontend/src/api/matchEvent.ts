import apiClient from './client';
import type { GoalRequest, GoalResponse, CardRequest, CardResponse } from '../types/matchEvent';
import type { MatchResultRequest, MatchResultResponse } from '../types/match';

export const matchEventApi = {
  getResult: (matchId: number) =>
    apiClient.get<MatchResultResponse>(`/match/${matchId}/result`),

  createResult: (matchId: number, data: MatchResultRequest) =>
    apiClient.post<MatchResultResponse>(`/match/${matchId}/result`, data),

  getGoals: (matchId: number) =>
    apiClient.get<GoalResponse[]>(`/match/${matchId}/goals`),

  createGoal: (matchId: number, data: GoalRequest) =>
    apiClient.post<GoalResponse>(`/match/${matchId}/goals`, data),

  deleteGoal: (matchId: number, goalId: number) =>
    apiClient.delete(`/match/${matchId}/goals/${goalId}`),

  getCards: (matchId: number) =>
    apiClient.get<CardResponse[]>(`/match/${matchId}/cards`),

  createCard: (matchId: number, data: CardRequest) =>
    apiClient.post<CardResponse>(`/match/${matchId}/cards`, data),

  deleteCard: (matchId: number, cardId: number) =>
    apiClient.delete(`/match/${matchId}/cards/${cardId}`),
};
