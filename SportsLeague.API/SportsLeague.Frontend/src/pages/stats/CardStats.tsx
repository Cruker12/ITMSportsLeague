import { useEffect, useState } from 'react';
import { standingsApi } from '../../api/standings';
import { tournamentApi } from '../../api/tournament';
import DataTable from '../../components/ui/DataTable';
import type { CardStatsDTO } from '../../types/standings';
import type { TournamentResponse } from '../../types/tournament';

export default function CardStats() {
  const [stats, setStats] = useState<CardStatsDTO[]>([]);
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const res = await tournamentApi.getAll({ pageSize: 100 });
        setTournaments(res.data.items);
      } catch (err) {
        console.error(err);
      }
    };
    loadTournaments();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      if (!selectedTournamentId) return;
      setLoading(true);
      try {
        const res = await standingsApi.getCardStats(selectedTournamentId);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [selectedTournamentId]);

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
        <select
          value={selectedTournamentId || ''}
          onChange={(e) => setSelectedTournamentId(e.target.value ? parseInt(e.target.value) : null)}
          className="filter-select"
        >
          <option value="">Seleccionar torneo...</option>
          {tournaments.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
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
