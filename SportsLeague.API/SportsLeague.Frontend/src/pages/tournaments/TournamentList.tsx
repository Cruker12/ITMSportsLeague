import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tournamentApi } from '../../api/tournament';
import { useCrud } from '../../hooks/useCrud';
import { useToastContext } from '../../contexts/ToastContext';
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
  const toast = useToastContext();
  const { items, totalCount, loading, page, setPage, totalPages, fetchAll, createItem, updateItem, removeItem } =
    useCrud<TournamentRequest, TournamentResponse>({
      getAll: tournamentApi.getAll,
      getById: tournamentApi.getById,
      create: tournamentApi.create,
      update: tournamentApi.update,
      delete: tournamentApi.delete,
      onSuccess: (a) => toast.success(a === 'create' ? 'Torneo creado' : a === 'update' ? 'Torneo actualizado' : 'Torneo eliminado'),
      onError: (msg) => toast.error(msg),
    });

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing] = useState<TournamentResponse | null>(null);
  const [deleting, setDeleting] = useState<TournamentResponse | null>(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = () => { setEditing(null); setShowModal(true); };
  const handleEdit = (t: TournamentResponse) => { setEditing(t); setShowModal(true); };
  const handleDelete = (t: TournamentResponse) => { setDeleting(t); setShowConfirm(true); };

  const handleSubmit = async (data: TournamentRequest) => {
    const ok = editing ? await updateItem(editing.id, data) : await createItem(data);
    if (ok) setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    if (deleting) { await removeItem(deleting.id); setShowConfirm(false); }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'season', header: 'Temporada' },
    { key: 'status', header: 'Estado', render: (item: TournamentResponse) => <StatusBadge type="tournament" value={item.status} /> },
    { key: 'startDate', header: 'Inicio', render: (item: TournamentResponse) => formatDate(item.startDate) },
    { key: 'endDate', header: 'Fin', render: (item: TournamentResponse) => formatDate(item.endDate) },
    { key: 'teamsCount', header: 'Equipos' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div><h1>Torneos</h1><p className="subtitle">{totalCount} registros</p></div>
        <button className="btn btn-primary" onClick={handleCreate}>+ Nuevo Torneo</button>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} onView={(t) => navigate(`/tournaments/${t.id}`)} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Torneo' : 'Nuevo Torneo'}>
        <TournamentForm initialData={editing || undefined} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
      <ConfirmDialog isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Eliminar Torneo" message={`Estas seguro de eliminar "${deleting?.name}"?`} />
    </div>
  );
}
