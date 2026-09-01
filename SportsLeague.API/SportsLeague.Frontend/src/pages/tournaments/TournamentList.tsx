import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { tournamentApi } from '../../api/tournament';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import TournamentForm from '../../components/forms/TournamentForm';
import StatusBadge from '../../components/ui/StatusBadge';
import type { TournamentRequest, TournamentResponse } from '../../types/tournament';
import { formatDate } from '../../utils/formatters';

export default function TournamentList() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<TournamentResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadTournaments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await tournamentApi.getAll({ page, pageSize: 10 });
      setTournaments(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadTournaments();
  }, [loadTournaments]);

  const totalPages = Math.ceil(totalCount / 10);

  const handleCreate = () => {
    setSelectedTournament(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (tournament: TournamentResponse) => {
    setSelectedTournament(tournament);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (tournament: TournamentResponse) => {
    setSelectedTournament(tournament);
    setShowConfirm(true);
  };

  const handleSubmit = async (data: TournamentRequest) => {
    try {
      if (isEditing && selectedTournament) {
        await tournamentApi.update(selectedTournament.id, data);
      } else {
        await tournamentApi.create(data);
      }
      setShowModal(false);
      loadTournaments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedTournament) {
      try {
        await tournamentApi.delete(selectedTournament.id);
        setShowConfirm(false);
        loadTournaments();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'season', header: 'Temporada' },
    {
      key: 'status',
      header: 'Estado',
      render: (item: TournamentResponse) => <StatusBadge type="tournament" value={item.status} />,
    },
    { key: 'teamsCount', header: 'Equipos' },
    { key: 'startDate', header: 'Inicio', render: (item: TournamentResponse) => formatDate(item.startDate) },
    { key: 'endDate', header: 'Fin', render: (item: TournamentResponse) => formatDate(item.endDate) },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Torneos</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nuevo Torneo
        </button>
      </div>

      <DataTable
        columns={columns}
        data={tournaments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(tournament) => navigate(`/tournaments/${tournament.id}`)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Editar Torneo' : 'Nuevo Torneo'}
      >
        <TournamentForm
          initialData={selectedTournament || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Torneo"
        message={`Estas seguro de eliminar el torneo "${selectedTournament?.name}"?`}
      />
    </div>
  );
}
