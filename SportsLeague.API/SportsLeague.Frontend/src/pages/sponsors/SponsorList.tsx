import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sponsorApi } from '../../api/sponsor';
import { useCrud } from '../../hooks/useCrud';
import { useToastContext } from '../../contexts/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import SponsorForm from '../../components/forms/SponsorForm';
import StatusBadge from '../../components/ui/StatusBadge';
import type { SponsorRequest, SponsorResponse } from '../../types/sponsor';

export default function SponsorList() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const { items, totalCount, loading, fetchAll, createItem, updateItem, removeItem } =
    useCrud<SponsorRequest, SponsorResponse>({
      getAll: async (params) => {
        const res = await sponsorApi.getAll();
        const page = params.page || 1;
        const pageSize = params.pageSize || 10;
        const items = res.data;
        const start = (page - 1) * pageSize;
        return { data: { items: items.slice(start, start + pageSize), totalCount: items.length, page, pageSize, totalPages: Math.ceil(items.length / pageSize), hasPrevious: page > 1, hasNext: start + pageSize < items.length } };
      },
      getById: sponsorApi.getById,
      create: sponsorApi.create,
      update: sponsorApi.update,
      delete: sponsorApi.delete,
      onSuccess: (a) => toast.success(a === 'create' ? 'Patrocinador creado' : a === 'update' ? 'Patrocinador actualizado' : 'Patrocinador eliminado'),
      onError: (msg) => toast.error(msg),
    });

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing] = useState<SponsorResponse | null>(null);
  const [deleting, setDeleting] = useState<SponsorResponse | null>(null);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCreate = () => { setEditing(null); setShowModal(true); };
  const handleEdit = (s: SponsorResponse) => { setEditing(s); setShowModal(true); };
  const handleDelete = (s: SponsorResponse) => { setDeleting(s); setShowConfirm(true); };

  const handleSubmit = async (data: SponsorRequest) => {
    const ok = editing ? await updateItem(editing.id, data) : await createItem(data);
    if (ok) setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    if (deleting) { await removeItem(deleting.id); setShowConfirm(false); }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'contactEmail', header: 'Email' },
    { key: 'category', header: 'Categoria', render: (item: SponsorResponse) => <StatusBadge type="sponsor" value={item.category} /> },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div><h1>Patrocinadores</h1><p className="subtitle">{totalCount} registros</p></div>
        <button className="btn btn-primary" onClick={handleCreate}>+ Nuevo Patrocinador</button>
      </div>
      <DataTable columns={columns} data={items} loading={loading} onEdit={handleEdit} onDelete={handleDelete} onView={(s) => navigate(`/sponsors/${s.id}`)} />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Patrocinador' : 'Nuevo Patrocinador'}>
        <SponsorForm initialData={editing || undefined} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
      <ConfirmDialog isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Eliminar Patrocinador" message={`Estas seguro de eliminar "${deleting?.name}"?`} />
    </div>
  );
}
