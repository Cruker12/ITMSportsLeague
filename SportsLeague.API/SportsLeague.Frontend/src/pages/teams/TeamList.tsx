import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamApi } from '../../api/team';
import { useCrud } from '../../hooks/useCrud';
import { useToastContext } from '../../contexts/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import TeamForm from '../../components/forms/TeamForm';
import type { TeamRequest, TeamResponse } from '../../types/team';
import { formatDate } from '../../utils/formatters';

export default function TeamList() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const { items, totalCount, loading, page, setPage, totalPages, fetchAll, createItem, updateItem, removeItem } =
    useCrud<TeamRequest, TeamResponse>({
      getAll: teamApi.getAll,
      getById: teamApi.getById,
      create: teamApi.create,
      update: teamApi.update,
      delete: teamApi.delete,
      onSuccess: (action) => toast.success(action === 'create' ? 'Equipo creado' : action === 'update' ? 'Equipo actualizado' : 'Equipo eliminado'),
      onError: (msg) => toast.error(msg),
    });

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing] = useState<TeamResponse | null>(null);
  const [deleting, setDeleting] = useState<TeamResponse | null>(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = () => { setEditing(null); setShowModal(true); };
  const handleEdit = (t: TeamResponse) => { setEditing(t); setShowModal(true); };
  const handleDelete = (t: TeamResponse) => { setDeleting(t); setShowConfirm(true); };

  const handleSubmit = async (data: TeamRequest) => {
    const ok = editing ? await updateItem(editing.id, data) : await createItem(data);
    if (ok) setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    if (deleting) {
      await removeItem(deleting.id);
      setShowConfirm(false);
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
        <div><h1>Equipos</h1><p className="subtitle">{totalCount} registros</p></div>
        <button className="btn btn-primary" onClick={handleCreate}>+ Nuevo Equipo</button>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} onView={(t) => navigate(`/teams/${t.id}`)} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Equipo' : 'Nuevo Equipo'}>
        <TeamForm initialData={editing || undefined} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
      <ConfirmDialog isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Eliminar Equipo" message={`Estas seguro de eliminar "${deleting?.name}"?`} />
    </div>
  );
}
