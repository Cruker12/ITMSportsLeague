import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { teamApi } from '../api/team';
import { tournamentApi } from '../api/tournament';
import { playerApi } from '../api/player';
import { refereeApi } from '../api/referee';
import { useToastContext } from '../contexts/ToastContext';

export default function Dashboard() {
  const toast = useToastContext();
  const [counts, setCounts] = useState({ teams: 0, tournaments: 0, players: 0, referees: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [teams, tournaments, players, referees] = await Promise.all([
          teamApi.getAll({ pageSize: 1 }),
          tournamentApi.getAll({ pageSize: 1 }),
          playerApi.getAll({ pageSize: 1 }),
          refereeApi.getAll({ pageSize: 1 }),
        ]);
        setCounts({
          teams: teams.data.totalCount,
          tournaments: tournaments.data.totalCount,
          players: players.data.totalCount,
          referees: referees.data.totalCount,
        });
      } catch {
        toast.error('Error al cargar estadisticas');
      } finally {
        setLoading(false);
      }
    };
    loadCounts();
  }, [toast]);

  if (loading) return <div className="loading">Cargando dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>ITM Sports League</h1>
      <p className="subtitle">Panel de Control</p>

      <div className="stats-grid">
        <Link to="/teams" className="stat-card">
          <span className="stat-number">{counts.teams}</span>
          <span className="stat-label">Equipos</span>
        </Link>
        <Link to="/players" className="stat-card">
          <span className="stat-number">{counts.players}</span>
          <span className="stat-label">Jugadores</span>
        </Link>
        <Link to="/tournaments" className="stat-card">
          <span className="stat-number">{counts.tournaments}</span>
          <span className="stat-label">Torneos</span>
        </Link>
        <Link to="/referees" className="stat-card">
          <span className="stat-number">{counts.referees}</span>
          <span className="stat-label">Arbitros</span>
        </Link>
      </div>

      <div className="quick-links">
        <h2>Accesos Rapidos</h2>
        <div className="links-grid">
          <Link to="/matches" className="quick-link">📋 Partidos</Link>
          <Link to="/sponsors" className="quick-link">💼 Patrocinadores</Link>
          <Link to="/stats/scorers" className="quick-link">⚽ Goleadores</Link>
          <Link to="/stats/cards" className="quick-link">🟨 Tarjetas</Link>
          <Link to="/api-tester" className="quick-link">🔧 Probador API</Link>
        </div>
      </div>
    </div>
  );
}
