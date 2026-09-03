import { useEffect, useState } from 'react';
import { refereeApi } from '../../api/referee';
import { useCrud } from '../../hooks/useCrud';
import { useToastContext } from '../../contexts/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import RefereeForm from '../../components/forms/RefereeForm';
import type { RefereeRequest, RefereeResponse } from '../../types/referee';

export default function RefereeList() {
  const toast = useToastContext();
  const { items, totalCount, loading, page, setPage, totalPages, fetchAll, createItem, updateItem, removeItem } =
    useCrud<RefereeRequest, RefereeResponse>({
      getAll: refereeApi.getAll,
      getById: refereeApi.getById,
      create: refereeApi.create,
      update: refereeApi.update,
      delete: refereeApi.delete,
      onSuccess: (a) => toast.success(a === 'create' ? 'Arbitro creado' : a === 'update' ? 'Arbitro actualizado' : 'Arbitro eliminado'),
      onError: (msg) => toast.error(msg),
    });

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing] = useState<RefereeResponse | null>(null);
  const [deleting, setDeleting] = useState<RefereeResponse | null>(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = () => { setEditing(null); setShowModal(true); };
  const handleEdit = (r: RefereeResponse) => { setEditing(r); setShowModal(true); };
  const handleDelete = (r: RefereeResponse) => { setDeleting(r); setShowConfirm(true); };

  const handleSubmit = async (data: RefereeRequest) => {
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
    { key: 'nationality', header: 'Nacionalidad' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div><h1>Arbitros</h1><p className="subtitle">{totalCount} registros</p></div>
        <button className="btn btn-primary" onClick={handleCreate}>+ Nuevo Arbitro</button>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Arbitro' : 'Nuevo Arbitro'}>
        <RefereeForm initialData={editing || undefined} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
      <ConfirmDialog isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Eliminar Arbitro" message={`Estas seguro de eliminar a "${deleting?.firstName} ${deleting?.lastName}"?`} />
    </div>
  );
}
