import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tournamentApi } from '../../api/tournament';
import { standingsApi } from '../../api/standings';
import { useToastContext } from '../../contexts/ToastContext';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import type { TournamentResponse } from '../../types/tournament';
import type { TeamResponse } from '../../types/team';
import type { StandingDTO } from '../../types/standings';
import { formatDate } from '../../utils/formatters';
import { TournamentStatus } from '../../utils/constants';

export default function TournamentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToastContext();
  const [tournament, setTournament] = useState<TournamentResponse | null>(null);
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [standings, setStandings] = useState<StandingDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const tournamentId = parseInt(id);
        const [tRes, teamsRes, standingsRes] = await Promise.all([
          tournamentApi.getById(tournamentId),
          tournamentApi.getTeams(tournamentId),
          standingsApi.getStandings(tournamentId),
        ]);
        setTournament(tRes.data);
        setTeams(teamsRes.data);
        setStandings(standingsRes.data);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, toast]);

  const handleStatusChange = async (newStatus: TournamentStatus) => {
    if (!id) return;
    setStatusLoading(true);
    try {
      await tournamentApi.updateStatus(parseInt(id), { status: newStatus });
      setTournament((prev) => (prev ? { ...prev, status: newStatus } : prev));
      toast.success('Estado actualizado');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al cambiar estado');
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando torneo...</div>;
  if (!tournament) return <div className="empty-state">Torneo no encontrado</div>;

  const standingColumns = [
    { key: 'position', header: '#' },
    { key: 'teamName', header: 'Equipo' },
    { key: 'matchesPlayed', header: 'PJ' },
    { key: 'wins', header: 'PG' },
    { key: 'draws', header: 'PE' },
    { key: 'losses', header: 'PP' },
    { key: 'goalsFor', header: 'GF' },
    { key: 'goalsAgainst', header: 'GC' },
    { key: 'goalDifference', header: 'DG' },
    { key: 'points', header: 'Pts' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <button className="btn btn-sm" onClick={() => navigate('/tournaments')}>&larr; Volver</button>
          <h1>{tournament.name}</h1>
        </div>
      </div>
      <div className="detail-grid">
        <div className="detail-card">
          <h3>Informacion del Torneo</h3>
          <p><strong>Temporada:</strong> {tournament.season}</p>
          <p><strong>Estado:</strong> <StatusBadge type="tournament" value={tournament.status} /></p>
          <p><strong>Inicio:</strong> {formatDate(tournament.startDate)}</p>
          <p><strong>Fin:</strong> {formatDate(tournament.endDate)}</p>
          <p><strong>Equipos inscritos:</strong> {teams.length}</p>
          <div className="status-actions">
            <h4>Cambiar Estado</h4>
            {tournament.status === TournamentStatus.Pending && (
              <button className="btn btn-success" onClick={() => handleStatusChange(TournamentStatus.InProgress)} disabled={statusLoading}>Iniciar Torneo</button>
            )}
            {tournament.status === TournamentStatus.InProgress && (
              <button className="btn btn-info" onClick={() => handleStatusChange(TournamentStatus.Finished)} disabled={statusLoading}>Finalizar Torneo</button>
            )}
          </div>
        </div>
      </div>
      <h2>Tabla de Posiciones</h2>
      {standings.length > 0 ? (
        <DataTable columns={standingColumns} data={standings} loading={false} getKey={(item) => item.teamId} />
      ) : (
        <div className="empty-state">No hay posiciones disponibles</div>
      )}
    </div>
  );
}
