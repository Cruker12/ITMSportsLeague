import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { playerApi } from '../../api/player';
import { useToastContext } from '../../contexts/ToastContext';
import StatusBadge from '../../components/ui/StatusBadge';
import type { PlayerResponse } from '../../types/player';
import { formatDate } from '../../utils/formatters';

export default function PlayerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToastContext();
  const [player, setPlayer] = useState<PlayerResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await playerApi.getById(parseInt(id));
        setPlayer(res.data);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error al cargar jugador');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, toast]);

  if (loading) return <div className="loading">Cargando jugador...</div>;
  if (!player) return <div className="empty-state">Jugador no encontrado</div>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <button className="btn btn-sm" onClick={() => navigate('/players')}>← Volver</button>
          <h1>{player.firstName} {player.lastName}</h1>
        </div>
      </div>
      <div className="detail-grid">
        <div className="detail-card">
          <h3>Informacion del Jugador</h3>
          <p><strong>Numero:</strong> {player.number}</p>
          <p><strong>Equipo:</strong> {player.teamName}</p>
          <p><strong>Posicion:</strong> <StatusBadge type="position" value={player.position} /></p>
          <p><strong>Fecha Nacimiento:</strong> {formatDate(player.birthDate)}</p>
          <p><strong>Creado:</strong> {formatDate(player.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
