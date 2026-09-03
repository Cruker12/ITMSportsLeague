import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sponsorApi } from '../../api/sponsor';
import { tournamentApi } from '../../api/tournament';
import { useToastContext } from '../../contexts/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import StatusBadge from '../../components/ui/StatusBadge';
import type { SponsorResponse, TournamentSponsorResponse } from '../../types/sponsor';
import type { TournamentResponse } from '../../types/tournament';
import { formatDateTime } from '../../utils/formatters';

export default function SponsorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToastContext();
  const [sponsor, setSponsor] = useState<SponsorResponse | null>(null);
  const [tournaments, setTournaments] = useState<TournamentSponsorResponse[]>([]);
  const [allTournaments, setAllTournaments] = useState<TournamentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState(0);
  const [contractAmount, setContractAmount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const sponsorId = parseInt(id);
        const [sRes, tRes] = await Promise.all([
          sponsorApi.getById(sponsorId),
          sponsorApi.getTournaments(sponsorId),
        ]);
        setSponsor(sRes.data);
        setTournaments(tRes.data);
        const allT = await tournamentApi.getAll({ pageSize: 100 });
        setAllTournaments(allT.data.items);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, toast]);

  const handleAddTournament = async () => {
    if (!id || !selectedTournamentId) return;
    try {
      await sponsorApi.addTournament(parseInt(id), { tournamentId: selectedTournamentId, contractAmount });
      const tRes = await sponsorApi.getTournaments(parseInt(id));
      setTournaments(tRes.data);
      setShowAddModal(false);
      setSelectedTournamentId(0);
      setContractAmount(0);
      toast.success('Torneo vinculado');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error');
    }
  };

  const handleRemoveTournament = async (tournamentId: number) => {
    if (!id) return;
    try {
      await sponsorApi.removeTournament(parseInt(id), tournamentId);
      setTournaments((prev) => prev.filter((t) => t.tournamentId !== tournamentId));
      toast.success('Torneo desvinculado');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error');
    }
  };

  if (loading) return <div className="loading">Cargando patrocinador...</div>;
  if (!sponsor) return <div className="empty-state">Patrocinador no encontrado</div>;

  const columns = [
    { key: 'tournamentName', header: 'Torneo' },
    { key: 'contractAmount', header: 'Monto Contrato' },
    { key: 'joinedAt', header: 'Fecha', render: (item: TournamentSponsorResponse) => formatDateTime(item.joinedAt) },
    { key: 'actions', header: '', render: (item: TournamentSponsorResponse) => <button className="btn btn-sm btn-danger" onClick={() => handleRemoveTournament(item.tournamentId)}>X</button> },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <button className="btn btn-sm" onClick={() => navigate('/sponsors')}>← Volver</button>
          <h1>{sponsor.name}</h1>
        </div>
      </div>
      <div className="detail-grid">
        <div className="detail-card">
          <h3>Informacion del Patrocinador</h3>
          <p><strong>Email:</strong> {sponsor.contactEmail}</p>
          <p><strong>Telefono:</strong> {sponsor.phone || 'No registrado'}</p>
          <p><strong>Sitio Web:</strong> {sponsor.websiteUrl || 'No registrado'}</p>
          <p><strong>Categoria:</strong> <StatusBadge type="sponsor" value={sponsor.category} /></p>
        </div>
      </div>
      <div className="events-section">
        <div className="events-header">
          <h2>Torneos Vinculados ({tournaments.length})</h2>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Vincular Torneo</button>
        </div>
        <DataTable columns={columns} data={tournaments} loading={false} />
      </div>
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Vincular Torneo">
        <div className="form">
          <div className="form-group">
            <label>Torneo</label>
            <select value={selectedTournamentId} onChange={(e) => setSelectedTournamentId(parseInt(e.target.value))}>
              <option value={0}>Seleccionar...</option>
              {allTournaments.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Monto del Contrato</label>
            <input type="number" value={contractAmount} onChange={(e) => setContractAmount(parseFloat(e.target.value) || 0)} min={0.01} step={0.01} />
          </div>
          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleAddTournament} disabled={!selectedTournamentId || contractAmount <= 0}>Vincular</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
