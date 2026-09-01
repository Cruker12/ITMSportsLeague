import { TournamentStatus, MatchStatus, GoalType, CardType, PlayerPosition, SponsorCategory } from '../../utils/constants';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'secondary';

function getTournamentStatusBadge(status: TournamentStatus): { label: string; variant: BadgeVariant } {
  switch (status) {
    case TournamentStatus.Pending: return { label: 'Pendiente', variant: 'secondary' };
    case TournamentStatus.InProgress: return { label: 'En Curso', variant: 'success' };
    case TournamentStatus.Finished: return { label: 'Finalizado', variant: 'info' };
    default: return { label: 'Desconocido', variant: 'secondary' };
  }
}

function getMatchStatusBadge(status: MatchStatus): { label: string; variant: BadgeVariant } {
  switch (status) {
    case MatchStatus.Scheduled: return { label: 'Programado', variant: 'secondary' };
    case MatchStatus.InProgress: return { label: 'En Curso', variant: 'success' };
    case MatchStatus.Finished: return { label: 'Finalizado', variant: 'info' };
    case MatchStatus.Suspended: return { label: 'Suspendido', variant: 'warning' };
    default: return { label: 'Desconocido', variant: 'secondary' };
  }
}

function getGoalTypeBadge(type: GoalType): { label: string; variant: BadgeVariant } {
  switch (type) {
    case GoalType.Normal: return { label: 'Normal', variant: 'info' };
    case GoalType.Penalty: return { label: 'Penalti', variant: 'warning' };
    case GoalType.OwnGoal: return { label: 'Autogol', variant: 'danger' };
    default: return { label: 'Desconocido', variant: 'secondary' };
  }
}

function getCardTypeBadge(type: CardType): { label: string; variant: BadgeVariant } {
  switch (type) {
    case CardType.Yellow: return { label: 'Amarilla', variant: 'warning' };
    case CardType.Red: return { label: 'Roja', variant: 'danger' };
    default: return { label: 'Desconocido', variant: 'secondary' };
  }
}

function getPlayerPositionLabel(pos: PlayerPosition): string {
  switch (pos) {
    case PlayerPosition.Goalkeeper: return 'Portero';
    case PlayerPosition.Defender: return 'Defensa';
    case PlayerPosition.Midfielder: return 'Mediocampista';
    case PlayerPosition.Forward: return 'Delantero';
    default: return 'Desconocido';
  }
}

function getSponsorCategoryLabel(cat: SponsorCategory): string {
  switch (cat) {
    case SponsorCategory.Main: return 'Principal';
    case SponsorCategory.Gold: return 'Oro';
    case SponsorCategory.Silver: return 'Plata';
    case SponsorCategory.Bronze: return 'Bronce';
    default: return 'Desconocido';
  }
}

interface StatusBadgeProps {
  type: 'tournament' | 'match' | 'goal' | 'card' | 'position' | 'sponsor';
  value: number;
}

export default function StatusBadge({ type, value }: StatusBadgeProps) {
  let label = '';
  let variant: BadgeVariant = 'secondary';

  switch (type) {
    case 'tournament': {
      const badge = getTournamentStatusBadge(value as TournamentStatus);
      label = badge.label;
      variant = badge.variant;
      break;
    }
    case 'match': {
      const badge = getMatchStatusBadge(value as MatchStatus);
      label = badge.label;
      variant = badge.variant;
      break;
    }
    case 'goal': {
      const badge = getGoalTypeBadge(value as GoalType);
      label = badge.label;
      variant = badge.variant;
      break;
    }
    case 'card': {
      const badge = getCardTypeBadge(value as CardType);
      label = badge.label;
      variant = badge.variant;
      break;
    }
    case 'position':
      label = getPlayerPositionLabel(value as PlayerPosition);
      variant = 'info';
      break;
    case 'sponsor':
      label = getSponsorCategoryLabel(value as SponsorCategory);
      variant = 'info';
      break;
  }

  return <span className={`badge badge-${variant}`}>{label}</span>;
}
