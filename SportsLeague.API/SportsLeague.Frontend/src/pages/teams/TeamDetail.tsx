import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { teamApi } from '../../api/team';
import { playerApi } from '../../api/player';
import DataTable from '../../components/ui/DataTable';
import StatusBadge from '../../components/ui/StatusBadge';
import type { TeamResponse } from '../../types/team';
import type { PlayerResponse } from '../../types/player';
import { formatDate } from '../../utils/formatters';

export default function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamResponse | null>(null);
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const teamId = parseInt(id);
        const [teamRes, playersRes] = await Promise.all([
          teamApi.getById(teamId),
          playerApi.getByTeam(teamId),
        ]);
        setTeam(teamRes.data);
        setPlayers(playersRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div className="loading">Cargando equipo...</div>;
  if (!team) return <div className="empty-state">Equipo no encontrado</div>;

  const playerColumns = [
    { key: 'number', header: '#' },
    { key: 'firstName', header: 'Nombre' },
    { key: 'lastName', header: 'Apellido' },
    {
      key: 'position',
      header: 'Posicion',
      render: (item: PlayerResponse) => <StatusBadge type="position" value={item.position} />,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <button className="btn btn-sm" onClick={() => navigate('/teams')}>
            ← Volver
          </button>
          <h1>{team.name}</h1>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Informacion del Equipo</h3>
          <p><strong>Ciudad:</strong> {team.city}</p>
          <p><strong>Estadio:</strong> {team.stadium || 'No asignado'}</p>
          <p><strong>Fundacion:</strong> {formatDate(team.foundedDate)}</p>
          <p><strong>Creado:</strong> {formatDate(team.createdAt)}</p>
        </div>
      </div>

      <h2>Jugadores ({players.length})</h2>
      <DataTable columns={playerColumns} data={players} loading={false} />
    </div>
  );
}
