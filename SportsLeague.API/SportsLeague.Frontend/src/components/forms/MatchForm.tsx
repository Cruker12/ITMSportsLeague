import { useState } from 'react';
import type { MatchRequest, MatchResponse } from '../../types/match';

interface MatchFormProps {
  initialData?: MatchResponse;
  tournaments: { id: number; name: string }[];
  teams: { id: number; name: string }[];
  referees: { id: number; firstName: string; lastName: string }[];
  onSubmit: (data: MatchRequest) => void;
  onCancel: () => void;
}

export default function MatchForm({ initialData, tournaments, teams, referees, onSubmit, onCancel }: MatchFormProps) {
  const [form, setForm] = useState<MatchRequest>({
    tournamentId: initialData?.tournamentId || (tournaments.length > 0 ? tournaments[0].id : 0),
    homeTeamId: initialData?.homeTeamId || (teams.length > 0 ? teams[0].id : 0),
    awayTeamId: initialData?.awayTeamId || (teams.length > 1 ? teams[1].id : 0),
    refereeId: initialData?.refereeId || (referees.length > 0 ? referees[0].id : 0),
    matchDate: initialData?.matchDate?.slice(0, 16) || '',
    venue: initialData?.venue || '',
    matchday: initialData?.matchday || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Torneo *</label>
        <select
          value={form.tournamentId}
          onChange={(e) => setForm({ ...form, tournamentId: parseInt(e.target.value) })}
        >
          {tournaments.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Equipo Local *</label>
          <select
            value={form.homeTeamId}
            onChange={(e) => setForm({ ...form, homeTeamId: parseInt(e.target.value) })}
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Equipo Visitante *</label>
          <select
            value={form.awayTeamId}
            onChange={(e) => setForm({ ...form, awayTeamId: parseInt(e.target.value) })}
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Arbitro *</label>
          <select
            value={form.refereeId}
            onChange={(e) => setForm({ ...form, refereeId: parseInt(e.target.value) })}
          >
            {referees.map((r) => (
              <option key={r.id} value={r.id}>{r.firstName} {r.lastName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Jornada *</label>
          <input
            type="number"
            value={form.matchday}
            onChange={(e) => setForm({ ...form, matchday: parseInt(e.target.value) || 1 })}
            min={1}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Fecha y Hora *</label>
          <input
            type="datetime-local"
            value={form.matchDate}
            onChange={(e) => setForm({ ...form, matchDate: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Sede</label>
          <input
            type="text"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            maxLength={150}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}
