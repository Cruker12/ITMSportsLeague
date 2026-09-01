import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchApi } from '../../api/match';
import { tournamentApi } from '../../api/tournament';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Pagination from '../../components/ui/Pagination';
import MatchForm from '../../components/forms/MatchForm';
import StatusBadge from '../../components/ui/StatusBadge';
import type { MatchRequest, MatchResponse } from '../../types/match';
import type { TournamentResponse } from '../../types/tournament';
import type { TeamResponse } from '../../types/team';
import type { RefereeResponse } from '../../types/referee';
import { teamApi } from '../../api/team';
import { refereeApi } from '../../api/referee';
import { formatDateTime } from '../../utils/formatters';

export default function MatchList() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<MatchResponse[]>([]);
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [referees, setReferees] = useState<RefereeResponse[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<MatchResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const loadInitialData = useCallback(async () => {
    try {
      const [tRes, teamsRes, refRes] = await Promise.all([
        tournamentApi.getAll({ pageSize: 100 }),
        teamApi.getAll({ pageSize: 100 }),
        refereeApi.getAll({ pageSize: 100 }),
      ]);
      setTournaments(tRes.data.items);
      setTeams(teamsRes.data.items);
      setReferees(refRes.data.items);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadMatches = useCallback(async () => {
    if (!selectedTournamentId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await matchApi.getByTournament(selectedTournamentId, { page, pageSize: 10 });
      setMatches(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedTournamentId, page]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const totalPages = Math.ceil(totalCount / 10);

  const handleCreate = () => {
    setSelectedMatch(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (match: MatchResponse) => {
    setSelectedMatch(match);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (match: MatchResponse) => {
    setSelectedMatch(match);
    setShowConfirm(true);
  };

  const handleSubmit = async (data: MatchRequest) => {
    try {
      if (isEditing && selectedMatch) {
        await matchApi.update(selectedMatch.id, data);
      } else {
        await matchApi.create(data);
      }
      setShowModal(false);
      loadMatches();
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedMatch) {
      try {
        await matchApi.delete(selectedMatch.id);
        setShowConfirm(false);
        loadMatches();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const columns = [
    { key: 'matchday', header: 'Jornada' },
    { key: 'homeTeamName', header: 'Local' },
    { key: 'awayTeamName', header: 'Visitante' },
    { key: 'refereeFullName', header: 'Arbitro' },
    { key: 'matchDate', header: 'Fecha', render: (item: MatchResponse) => formatDateTime(item.matchDate) },
    {
      key: 'status',
      header: 'Estado',
      render: (item: MatchResponse) => <StatusBadge type="match" value={item.status} />,
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Partidos</h1>
        <div className="header-actions">
          <select
            value={selectedTournamentId || ''}
            onChange={(e) => {
              setSelectedTournamentId(e.target.value ? parseInt(e.target.value) : null);
              setPage(1);
            }}
            className="filter-select"
          >
            <option value="">Seleccionar torneo...</option>
            {tournaments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.season})
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleCreate} disabled={!selectedTournamentId}>
            + Nuevo Partido
          </button>
        </div>
      </div>

      {selectedTournamentId ? (
        <>
          <DataTable
            columns={columns}
            data={matches}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={(match) => navigate(`/matches/${match.id}`)}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <div className="empty-state">Selecciona un torneo para ver los partidos</div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Editar Partido' : 'Nuevo Partido'}
      >
        <MatchForm
          initialData={selectedMatch || undefined}
          tournaments={tournaments}
          teams={teams}
          referees={referees}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Partido"
        message="Estas seguro de eliminar este partido?"
      />
    </div>
  );
}
