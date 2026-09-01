import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { matchApi } from '../../api/match';
import { matchEventApi } from '../../api/matchEvent';
import { playerApi } from '../../api/player';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import StatusBadge from '../../components/ui/StatusBadge';
import GoalForm from '../../components/forms/GoalForm';
import CardForm from '../../components/forms/CardForm';
import MatchResultForm from '../../components/forms/MatchResultForm';
import type { MatchResponse } from '../../types/match';
import type { GoalRequest, GoalResponse, CardRequest, CardResponse } from '../../types/matchEvent';
import type { MatchResultRequest, MatchResultResponse } from '../../types/match';
import type { PlayerResponse } from '../../types/player';
import { MatchStatus } from '../../utils/constants';
import { formatDateTime } from '../../utils/formatters';

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [match, setMatch] = useState<MatchResponse | null>(null);
  const [result, setResult] = useState<MatchResultResponse | null>(null);
  const [goals, setGoals] = useState<GoalResponse[]>([]);
  const [cards, setCards] = useState<CardResponse[]>([]);
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'goal' | 'card'; id: number } | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const matchId = parseInt(id);
      const [matchRes, resultRes, goalsRes, cardsRes] = await Promise.all([
        matchApi.getById(matchId),
        matchEventApi.getResult(matchId).catch(() => null),
        matchEventApi.getGoals(matchId),
        matchEventApi.getCards(matchId),
      ]);
      setMatch(matchRes.data);
      setResult(resultRes?.data || null);
      setGoals(goalsRes.data);
      setCards(cardsRes.data);

      if (matchRes.data) {
        const playersRes = await playerApi.getByTeam(matchRes.data.homeTeamId);
        const awayPlayersRes = await playerApi.getByTeam(matchRes.data.awayTeamId);
        setPlayers([...playersRes.data, ...awayPlayersRes.data]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleStatusChange = async (newStatus: MatchStatus) => {
    if (!id) return;
    setStatusLoading(true);
    try {
      await matchApi.updateStatus(parseInt(id), { status: newStatus });
      setMatch((prev) => (prev ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      console.error(err);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleCreateResult = async (data: MatchResultRequest) => {
    if (!id) return;
    try {
      const res = await matchEventApi.createResult(parseInt(id), data);
      setResult(res.data);
      setShowResultModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateGoal = async (data: GoalRequest) => {
    if (!id) return;
    try {
      await matchEventApi.createGoal(parseInt(id), data);
      loadData();
      setShowGoalModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCard = async (data: CardRequest) => {
    if (!id) return;
    try {
      await matchEventApi.createCard(parseInt(id), data);
      loadData();
      setShowCardModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteGoal = async () => {
    if (!id || !deleteConfirm || deleteConfirm.type !== 'goal') return;
    try {
      await matchEventApi.deleteGoal(parseInt(id), deleteConfirm.id);
      loadData();
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCard = async () => {
    if (!id || !deleteConfirm || deleteConfirm.type !== 'card') return;
    try {
      await matchEventApi.deleteCard(parseInt(id), deleteConfirm.id);
      loadData();
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Cargando partido...</div>;
  if (!match) return <div className="empty-state">Partido no encontrado</div>;

  const goalColumns = [
    { key: 'minute', header: 'Min' },
    { key: 'playerName', header: 'Jugador' },
    {
      key: 'type',
      header: 'Tipo',
      render: (item: GoalResponse) => <StatusBadge type="goal" value={item.type} />,
    },
    {
      key: 'actions',
      header: '',
      render: (item: GoalResponse) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => setDeleteConfirm({ type: 'goal', id: item.id })}
        >
          X
        </button>
      ),
    },
  ];

  const cardColumns = [
    { key: 'minute', header: 'Min' },
    { key: 'playerName', header: 'Jugador' },
    {
      key: 'type',
      header: 'Tipo',
      render: (item: CardResponse) => <StatusBadge type="card" value={item.type} />,
    },
    {
      key: 'actions',
      header: '',
      render: (item: CardResponse) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => setDeleteConfirm({ type: 'card', id: item.id })}
        >
          X
        </button>
      ),
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <button className="btn btn-sm" onClick={() => navigate('/matches')}>
            ← Volver
          </button>
          <h1>{match.homeTeamName} vs {match.awayTeamName}</h1>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Informacion del Partido</h3>
          <p><strong>Torneo:</strong> {match.tournamentName}</p>
          <p><strong>Arbitro:</strong> {match.refereeFullName}</p>
          <p><strong>Fecha:</strong> {formatDateTime(match.matchDate)}</p>
          <p><strong>Jornada:</strong> {match.matchday}</p>
          <p><strong>Sede:</strong> {match.venue || 'No asignada'}</p>
          <p>
            <strong>Estado:</strong>{' '}
            <StatusBadge type="match" value={match.status} />
          </p>

          <div className="status-actions">
            {match.status === MatchStatus.Scheduled && (
              <button
                className="btn btn-success"
                onClick={() => handleStatusChange(MatchStatus.InProgress)}
                disabled={statusLoading}
              >
                Iniciar Partido
              </button>
            )}
            {match.status === MatchStatus.InProgress && (
              <>
                <button
                  className="btn btn-info"
                  onClick={() => handleStatusChange(MatchStatus.Finished)}
                  disabled={statusLoading}
                >
                  Finalizar
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleStatusChange(MatchStatus.Suspended)}
                  disabled={statusLoading}
                >
                  Suspender
                </button>
              </>
            )}
          </div>
        </div>

        <div className="detail-card">
          <h3>Resultado</h3>
          {result ? (
            <div className="result-display">
              <span className="score">{result.homeGoals} - {result.awayGoals}</span>
              {result.observations && <p><em>{result.observations}</em></p>}
            </div>
          ) : (
            <p>Sin resultado registrado</p>
          )}
          <button className="btn btn-primary" onClick={() => setShowResultModal(true)}>
            {result ? 'Actualizar Resultado' : 'Registrar Resultado'}
          </button>
        </div>
      </div>

      <div className="events-section">
        <div className="events-header">
          <h2>Goles ({goals.length})</h2>
          <button className="btn btn-sm btn-success" onClick={() => setShowGoalModal(true)}>
            + Gol
          </button>
        </div>
        <DataTable columns={goalColumns} data={goals} loading={false} />
      </div>

      <div className="events-section">
        <div className="events-header">
          <h2>Tarjetas ({cards.length})</h2>
          <button className="btn btn-sm btn-warning" onClick={() => setShowCardModal(true)}>
            + Tarjeta
          </button>
        </div>
        <DataTable columns={cardColumns} data={cards} loading={false} />
      </div>

      <Modal isOpen={showResultModal} onClose={() => setShowResultModal(false)} title="Resultado">
        <MatchResultForm
          initialData={result || undefined}
          onSubmit={handleCreateResult}
          onCancel={() => setShowResultModal(false)}
        />
      </Modal>

      <Modal isOpen={showGoalModal} onClose={() => setShowGoalModal(false)} title="Registrar Gol">
        <GoalForm players={players} onSubmit={handleCreateGoal} onCancel={() => setShowGoalModal(false)} />
      </Modal>

      <Modal isOpen={showCardModal} onClose={() => setShowCardModal(false)} title="Registrar Tarjeta">
        <CardForm players={players} onSubmit={handleCreateCard} onCancel={() => setShowCardModal(false)} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={deleteConfirm?.type === 'goal' ? handleDeleteGoal : handleDeleteCard}
        title={deleteConfirm?.type === 'goal' ? 'Eliminar Gol' : 'Eliminar Tarjeta'}
        message="Estas seguro de eliminar este registro?"
      />
    </div>
  );
}


