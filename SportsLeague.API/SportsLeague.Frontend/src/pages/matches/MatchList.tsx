import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchApi } from '../../api/match';
import { tournamentApi } from '../../api/tournament';
import { useToastContext } from '../../contexts/ToastContext';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import MatchForm from '../../components/forms/MatchForm';
import StatusBadge from '../../components/ui/StatusBadge';
import type { MatchRequest, MatchResponse } from '../../types/match';
import type { TournamentResponse } from '../../types/tournament';
import { formatDateTime } from '../../utils/formatters';

export default function MatchList() {
  const navigate = useNavigate();
  const toast = useToastContext();
  const [matches, setMatches] = useState<MatchResponse[]>([]);
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing] = useState<MatchResponse | null>(null);
  const [deleting, setDeleting] = useState<MatchResponse | null>(null);

  const loadMatches = useCallback(async () => {
    if (!selectedTournamentId) return;
    setLoading(true);
    try {
      const res = await matchApi.getByTournament(selectedTournamentId, { page, pageSize: 10 });
      setMatches(res.data.items);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al cargar partidos');
    } finally {
      setLoading(false);
    }
  }, [selectedTournamentId, page, toast]);

  useEffect(() => {
    tournamentApi.getAll({ pageSize: 100 }).then((r) => setTournaments(r.data.items));
  }, []);

  useEffect(() => { loadMatches(); }, [loadMatches]);

  const totalPages = Math.ceil(totalCount / 10);

  const handleCreate = () => { setEditing(null); setShowModal(true); };
  const handleEdit = (m: MatchResponse) => { setEditing(m); setShowModal(true); };
  const handleDelete = (m: MatchResponse) => { setDeleting(m); setShowConfirm(true); };

  const handleSubmit = async (data: MatchRequest) => {
    try {
      if (editing) { await matchApi.update(editing.id, data); }
      else { await matchApi.create(data); }
      toast.success(editing ? 'Partido actualizado' : 'Partido creado');
      setShowModal(false);
      loadMatches();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleting) return;
    try {
      await matchApi.delete(deleting.id);
      toast.success('Partido eliminado');
      setShowConfirm(false);
      loadMatches();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error');
    }
  };

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'homeTeamName', header: 'Local' },
    { key: 'awayTeamName', header: 'Visitante' },
    { key: 'matchDate', header: 'Fecha', render: (item: MatchResponse) => formatDateTime(item.matchDate) },
    { key: 'matchday', header: 'Jornada' },
    { key: 'status', header: 'Estado', render: (item: MatchResponse) => <StatusBadge type="match" value={item.status} /> },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Partidos</h1>
          <p className="subtitle">{totalCount} registros</p>
        </div>
        <div className="header-actions">
          <select value={selectedTournamentId || ''} onChange={(e) => { setSelectedTournamentId(e.target.value ? parseInt(e.target.value) : null); setPage(1); }} className="filter-select">
            <option value="">Seleccionar torneo...</option>
            {tournaments.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <button className="btn btn-primary" onClick={handleCreate} disabled={!selectedTournamentId}>+ Nuevo Partido</button>
        </div>
      </div>
      {selectedTournamentId ? (
        <>
          <DataTable columns={columns} data={matches} loading={loading} onEdit={handleEdit} onDelete={handleDelete} onView={(m) => navigate(`/matches/${m.id}`)} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <div className="empty-state">Selecciona un torneo para ver los partidos</div>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editing ? 'Editar Partido' : 'Nuevo Partido'}>
        <MatchForm initialData={editing || undefined} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
      <ConfirmDialog isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleConfirmDelete} title="Eliminar Partido" message="Estas seguro de eliminar este partido?" />
    </div>
  );
}
