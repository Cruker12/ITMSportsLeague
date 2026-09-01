import { useEffect, useState, useCallback } from 'react';
import { refereeApi } from '../../api/referee';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import RefereeForm from '../../components/forms/RefereeForm';
import type { RefereeRequest, RefereeResponse } from '../../types/referee';

export default function RefereeList() {
  const [referees, setReferees] = useState<RefereeResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState<RefereeResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadReferees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await refereeApi.getAll({ page, pageSize: 10 });
      setReferees(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadReferees();
  }, [loadReferees]);

  const totalPages = Math.ceil(totalCount / 10);

  const handleCreate = () => {
    setSelectedReferee(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (referee: RefereeResponse) => {
    setSelectedReferee(referee);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (referee: RefereeResponse) => {
    setSelectedReferee(referee);
    setShowConfirm(true);
  };

  const handleSubmit = async (data: RefereeRequest) => {
    try {
      if (isEditing && selectedReferee) {
        await refereeApi.update(selectedReferee.id, data);
      } else {
        await refereeApi.create(data);
      }
      setShowModal(false);
      loadReferees();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedReferee) {
      try {
        await refereeApi.delete(selectedReferee.id);
        setShowConfirm(false);
        loadReferees();
      } catch (err) {
        console.error(err);
      }
    }
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
        <h1>Arbitros</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nuevo Arbitro
        </button>
      </div>

      <DataTable
        columns={columns}
        data={referees}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Editar Arbitro' : 'Nuevo Arbitro'}
      >
        <RefereeForm
          initialData={selectedReferee || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Arbitro"
        message={`Estas seguro de eliminar al arbitro "${selectedReferee?.firstName} ${selectedReferee?.lastName}"?`}
      />
    </div>
  );
}
