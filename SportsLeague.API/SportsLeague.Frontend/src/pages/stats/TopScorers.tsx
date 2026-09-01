import { useEffect, useState } from 'react';
import { standingsApi } from '../../api/standings';
import { tournamentApi } from '../../api/tournament';
import DataTable from '../../components/ui/DataTable';
import type { TopScorerDTO } from '../../types/standings';
import type { TournamentResponse } from '../../types/tournament';

export default function TopScorers() {
  const [scorers, setScorers] = useState<TopScorerDTO[]>([]);
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
    const loadScorers = async () => {
      if (!selectedTournamentId) return;
      setLoading(true);
      try {
        const res = await standingsApi.getTopScorers(selectedTournamentId);
        setScorers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadScorers();
  }, [selectedTournamentId]);

  const columns = [
    { key: 'playerName', header: 'Jugador' },
    { key: 'teamName', header: 'Equipo' },
    { key: 'goals', header: 'Goles' },
    { key: 'penalties', header: 'Penaltis' },
    { key: 'matchesWithGoals', header: 'Partidos con Gol' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Goleadores</h1>
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
        <DataTable columns={columns} data={scorers} loading={loading} getKey={(item) => item.playerId} />
      ) : (
        <div className="empty-state">Selecciona un torneo para ver los goleadores</div>
      )}
    </div>
  );
}
