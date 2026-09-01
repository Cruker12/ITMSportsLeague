import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamApi } from '../../api/team';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import TeamForm from '../../components/forms/TeamForm';
import type { TeamRequest, TeamResponse } from '../../types/team';
import { formatDate } from '../../utils/formatters';

export default function TeamList() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadTeams = useCallback(async () => {
    setLoading(true);
    try {
      const response = await teamApi.getAll({ page, pageSize: 10 });
      setTeams(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const totalPages = Math.ceil(totalCount / 10);

  const handleCreate = () => {
    setSelectedTeam(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (team: TeamResponse) => {
    setSelectedTeam(team);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (team: TeamResponse) => {
    setSelectedTeam(team);
    setShowConfirm(true);
  };

  const handleSubmit = async (data: TeamRequest) => {
    try {
      if (isEditing && selectedTeam) {
        await teamApi.update(selectedTeam.id, data);
      } else {
        await teamApi.create(data);
      }
      setShowModal(false);
      loadTeams();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedTeam) {
      try {
        await teamApi.delete(selectedTeam.id);
        setShowConfirm(false);
        loadTeams();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'city', header: 'Ciudad' },
    { key: 'stadium', header: 'Estadio' },
    { key: 'foundedDate', header: 'Fundacion', render: (item: TeamResponse) => formatDate(item.foundedDate) },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Equipos</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nuevo Equipo
        </button>
      </div>

      <DataTable
        columns={columns}
        data={teams}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(team) => navigate(`/teams/${team.id}`)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Editar Equipo' : 'Nuevo Equipo'}
      >
        <TeamForm
          initialData={selectedTeam || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Equipo"
        message={`Estas seguro de eliminar el equipo "${selectedTeam?.name}"?`}
      />
    </div>
  );
}
