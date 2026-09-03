import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playerApi } from '../../api/player';
import { useCrud } from '../../hooks/useCrud';
import { useToastContext } from '../../contexts/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import PlayerForm from '../../components/forms/PlayerForm';
import StatusBadge from '../../components/ui/StatusBadge';
import type { PlayerRequest, PlayerResponse } from '../../types/player';
import { formatDate } from '../../utils/formatters';

export default function PlayerList() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const { items, totalCount, loading, page, setPage, totalPages, fetchAll, createItem, updateItem, removeItem } =
    useCrud<PlayerRequest, PlayerResponse>({
      getAll: playerApi.getAll,
      getById: playerApi.getById,
      create: playerApi.create,
      update: playerApi.update,
      delete: playerApi.delete,
      onSuccess: (a) => toast.success(a === 'create' ? 'Jugador creado' : a === 'update' ? 'Jugador actualizado' : 'Jugador eliminado'),
      onError: (msg) => toast.error(msg),
    });

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing] = useState<PlayerResponse | null>(null);
  const [deleting, setDeleting] = useState<PlayerResponse | null>(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = () => { setEditing(null); setShowModal(true); };
  const handleEdit = (p: PlayerResponse) => { setEditing(p); setShowModal(true); };
  const handleDelete = (p: PlayerResponse) => { setDeleting(p); setShowConfirm(true); };

  const handleSubmit = async (data: PlayerRequest) => {
    const ok = editing ? await updateItem(editing.id, data) : await createItem(data);
    if (ok) setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    if (deleting) { await removeItem(deleting.id); setShowConfirm(false); }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'firstName', header: 'Nombre' },
    { key: 'lastName', header: 'Apellido' },
    { key: 'number', header: '#' },
    { key: 'position', header: 'Posicion', render: (item: PlayerResponse) => <StatusBadge type="position" value={item.position} /> },
    { key: 'teamName', header: 'Equipo' },
    { key: 'birthDate', header: 'Nacimiento', render: (item: PlayerResponse) => formatDate(item.birthDate) },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div><h1>Jugadores</h1><p className="subtitle">{totalCount} registros</p></div>
        <button className="btn btn-primary" onClick={handleCreate}>+ Nuevo Jugador</button>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} onView={(p) => navigate(`/players/${p.id}`)} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Jugador' : 'Nuevo Jugador'}>
        <PlayerForm initialData={editing || undefined} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
      <ConfirmDialog isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Eliminar Jugador" message={`Estas seguro de eliminar a "${deleting?.firstName} ${deleting?.lastName}"?`} />
    </div>
  );
}
