import { useEffect, useState } from 'react';
import { standingsApi } from '../../api/standings';
import { tournamentApi } from '../../api/tournament';
import { useToastContext } from '../../contexts/ToastContext';
import DataTable from '../../components/ui/DataTable';
import type { CardStatsDTO } from '../../types/standings';
import type { TournamentResponse } from '../../types/tournament';

export default function CardStats() {
  const toast = useToastContext();
  const [stats, setStats] = useState<CardStatsDTO[]>([]);
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tournamentApi.getAll({ pageSize: 100 }).then((r) => setTournaments(r.data.items)).catch((err) => toast.error(err.message));
  }, [toast]);

  useEffect(() => {
    if (!selectedTournamentId) return;
    setLoading(true);
    standingsApi.getCardStats(selectedTournamentId).then((r) => setStats(r.data)).catch((err) => toast.error(err.message)).finally(() => setLoading(false));
  }, [selectedTournamentId, toast]);

  const columns = [
    { key: 'playerName', header: 'Jugador' },
    { key: 'teamName', header: 'Equipo' },
    { key: 'yellowCards', header: 'Amarillas' },
    { key: 'redCards', header: 'Rojas' },
    { key: 'totalCards', header: 'Total' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Estadisticas de Tarjetas</h1>
        <select value={selectedTournamentId || ''} onChange={(e) => setSelectedTournamentId(e.target.value ? parseInt(e.target.value) : null)} className="filter-select">
          <option value="">Seleccionar torneo...</option>
          {tournaments.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      {selectedTournamentId ? (
        <DataTable columns={columns} data={stats} loading={loading} getKey={(item) => item.playerId} />
      ) : (
        <div className="empty-state">Selecciona un torneo para ver las estadisticas</div>
      )}
    </div>
  );
}
