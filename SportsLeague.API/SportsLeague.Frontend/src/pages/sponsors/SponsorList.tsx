import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { sponsorApi } from '../../api/sponsor';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import SponsorForm from '../../components/forms/SponsorForm';
import StatusBadge from '../../components/ui/StatusBadge';
import type { SponsorRequest, SponsorResponse } from '../../types/sponsor';

export default function SponsorList() {
  const navigate = useNavigate();
  const [sponsors, setSponsors] = useState<SponsorResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<SponsorResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadSponsors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await sponsorApi.getAll();
      setSponsors(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSponsors();
  }, [loadSponsors]);

  const handleCreate = () => {
    setSelectedSponsor(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (sponsor: SponsorResponse) => {
    setSelectedSponsor(sponsor);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (sponsor: SponsorResponse) => {
    setSelectedSponsor(sponsor);
    setShowConfirm(true);
  };

  const handleSubmit = async (data: SponsorRequest) => {
    try {
      if (isEditing && selectedSponsor) {
        await sponsorApi.update(selectedSponsor.id, data);
      } else {
        await sponsorApi.create(data);
      }
      setShowModal(false);
      loadSponsors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedSponsor) {
      try {
        await sponsorApi.delete(selectedSponsor.id);
        setShowConfirm(false);
        loadSponsors();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'contactEmail', header: 'Email' },
    { key: 'phone', header: 'Telefono' },
    {
      key: 'category',
      header: 'Categoria',
      render: (item: SponsorResponse) => <StatusBadge type="sponsor" value={item.category} />,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Patrocinadores</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nuevo Patrocinador
        </button>
      </div>

      <DataTable
        columns={columns}
        data={sponsors}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(sponsor) => navigate(`/sponsors/${sponsor.id}`)}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Editar Patrocinador' : 'Nuevo Patrocinador'}
      >
        <SponsorForm
          initialData={selectedSponsor || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Patrocinador"
        message={`Estas seguro de eliminar el patrocinador "${selectedSponsor?.name}"?`}
      />
    </div>
  );
}
