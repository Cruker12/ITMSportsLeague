import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { playerApi } from '../../api/player';
import { teamApi } from '../../api/team';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import PlayerForm from '../../components/forms/PlayerForm';
import StatusBadge from '../../components/ui/StatusBadge';
import type { PlayerRequest, PlayerResponse } from '../../types/player';
import type { TeamResponse } from '../../types/team';

export default function PlayerList() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const [playersRes, teamsRes] = await Promise.all([
        playerApi.getAll({ page, pageSize: 10 }),
        teamApi.getAll({ pageSize: 100 }),
      ]);
      setPlayers(playersRes.data.items);
      setTotalCount(playersRes.data.totalCount);
      setTeams(teamsRes.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  const totalPages = Math.ceil(totalCount / 10);

  const handleCreate = () => {
    setSelectedPlayer(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (player: PlayerResponse) => {
    setSelectedPlayer(player);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (player: PlayerResponse) => {
    setSelectedPlayer(player);
    setShowConfirm(true);
  };

  const handleSubmit = async (data: PlayerRequest) => {
    try {
      if (isEditing && selectedPlayer) {
        await playerApi.update(selectedPlayer.id, data);
      } else {
        await playerApi.create(data);
      }
      setShowModal(false);
      loadPlayers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedPlayer) {
      try {
        await playerApi.delete(selectedPlayer.id);
        setShowConfirm(false);
        loadPlayers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns = [
    { key: 'number', header: '#' },
    { key: 'firstName', header: 'Nombre' },
    { key: 'lastName', header: 'Apellido' },
    { key: 'teamName', header: 'Equipo' },
    {
      key: 'position',
      header: 'Posicion',
      render: (item: PlayerResponse) => <StatusBadge type="position" value={item.position} />,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Jugadores</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nuevo Jugador
        </button>
      </div>

      <DataTable
        columns={columns}
        data={players}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(player) => navigate(`/players/${player.id}`)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Editar Jugador' : 'Nuevo Jugador'}
      >
        <PlayerForm
          initialData={selectedPlayer || undefined}
          teams={teams}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Jugador"
        message={`Estas seguro de eliminar al jugador "${selectedPlayer?.firstName} ${selectedPlayer?.lastName}"?`}
      />
    </div>
  );
}
