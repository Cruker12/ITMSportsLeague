export enum TournamentStatus {
  Pending = 0,
  InProgress = 1,
  Finished = 2,
}

export enum MatchStatus {
  Scheduled = 0,
  InProgress = 1,
  Finished = 2,
  Suspended = 3,
}

export enum GoalType {
  Normal = 0,
  Penalty = 1,
  OwnGoal = 2,
}

export enum CardType {
  Yellow = 0,
  Red = 1,
}

export enum PlayerPosition {
  Goalkeeper = 0,
  Defender = 1,
  Midfielder = 2,
  Forward = 3,
}

export enum SponsorCategory {
  Main = 0,
  Gold = 1,
  Silver = 2,
  Bronze = 3,
}

export const TournamentStatusLabels: Record<TournamentStatus, string> = {
  [TournamentStatus.Pending]: 'Pendiente',
  [TournamentStatus.InProgress]: 'En Curso',
  [TournamentStatus.Finished]: 'Finalizado',
};

export const MatchStatusLabels: Record<MatchStatus, string> = {
  [MatchStatus.Scheduled]: 'Programado',
  [MatchStatus.InProgress]: 'En Curso',
  [MatchStatus.Finished]: 'Finalizado',
  [MatchStatus.Suspended]: 'Suspendido',
};

export const GoalTypeLabels: Record<GoalType, string> = {
  [GoalType.Normal]: 'Normal',
  [GoalType.Penalty]: 'Penalti',
  [GoalType.OwnGoal]: 'Autogol',
};

export const CardTypeLabels: Record<CardType, string> = {
  [CardType.Yellow]: 'Amarilla',
  [CardType.Red]: 'Roja',
};

export const PlayerPositionLabels: Record<PlayerPosition, string> = {
  [PlayerPosition.Goalkeeper]: 'Portero',
  [PlayerPosition.Defender]: 'Defensa',
  [PlayerPosition.Midfielder]: 'Mediocampista',
  [PlayerPosition.Forward]: 'Delantero',
};

export const SponsorCategoryLabels: Record<SponsorCategory, string> = {
  [SponsorCategory.Main]: 'Principal',
  [SponsorCategory.Gold]: 'Oro',
  [SponsorCategory.Silver]: 'Plata',
  [SponsorCategory.Bronze]: 'Bronce',
};

