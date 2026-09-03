import { useState, useEffect } from 'react';
import FormField from '../ui/FormField';
import { tournamentApi } from '../../api/tournament';
import { teamApi } from '../../api/team';
import { refereeApi } from '../../api/referee';
import type { MatchRequest, MatchResponse } from '../../types/match';
import type { TournamentResponse } from '../../types/tournament';
import type { TeamResponse } from '../../types/team';
import type { RefereeResponse } from '../../types/referee';

interface MatchFormProps {
  initialData?: MatchResponse;
  onSubmit: (data: MatchRequest) => void;
  onCancel: () => void;
}

interface FormErrors {
  tournamentId?: string;
  homeTeamId?: string;
  awayTeamId?: string;
  refereeId?: string;
  matchDate?: string;
  matchday?: string;
}

export default function MatchForm({ initialData, onSubmit, onCancel }: MatchFormProps) {
  const [form, setForm] = useState<MatchRequest>({
    tournamentId: initialData?.tournamentId || 0,
    homeTeamId: initialData?.homeTeamId || 0,
    awayTeamId: initialData?.awayTeamId || 0,
    refereeId: initialData?.refereeId || 0,
    matchDate: initialData?.matchDate?.split('T')[0] || '',
    venue: initialData?.venue || '',
    matchday: initialData?.matchday || 1,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [tournaments, setTournaments] = useState<TournamentResponse[]>([]);
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [referees, setReferees] = useState<RefereeResponse[]>([]);

  useEffect(() => {
    Promise.all([
      tournamentApi.getAll({ pageSize: 100 }),
      teamApi.getAll({ pageSize: 100 }),
      refereeApi.getAll({ pageSize: 100 }),
    ]).then(([t, te, r]) => {
      setTournaments(t.data.items);
      setTeams(te.data.items);
      setReferees(r.data.items);
    });
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.tournamentId) e.tournamentId = 'Seleccione un torneo';
    if (!form.homeTeamId) e.homeTeamId = 'Seleccione equipo local';
    if (!form.awayTeamId) e.awayTeamId = 'Seleccione equipo visitante';
    if (form.homeTeamId && form.awayTeamId && form.homeTeamId === form.awayTeamId) e.awayTeamId = 'Debe ser diferente al local';
    if (!form.refereeId) e.refereeId = 'Seleccione un arbitro';
    if (!form.matchDate) e.matchDate = 'La fecha es obligatoria';
    if (form.matchday < 1) e.matchday = 'Debe ser >= 1';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <FormField label="Torneo" required error={errors.tournamentId}>
        <select value={form.tournamentId || ''} onChange={(e) => setForm({ ...form, tournamentId: parseInt(e.target.value) })}>
          <option value="">Seleccionar torneo...</option>
          {tournaments.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </FormField>
      <div className="form-row">
        <FormField label="Equipo Local" required error={errors.homeTeamId}>
          <select value={form.homeTeamId || ''} onChange={(e) => setForm({ ...form, homeTeamId: parseInt(e.target.value) })}>
            <option value="">Seleccionar...</option>
            {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </FormField>
        <FormField label="Equipo Visitante" required error={errors.awayTeamId}>
          <select value={form.awayTeamId || ''} onChange={(e) => setForm({ ...form, awayTeamId: parseInt(e.target.value) })}>
            <option value="">Seleccionar...</option>
            {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </FormField>
      </div>
      <FormField label="Arbitro" required error={errors.refereeId}>
        <select value={form.refereeId || ''} onChange={(e) => setForm({ ...form, refereeId: parseInt(e.target.value) })}>
          <option value="">Seleccionar arbitro...</option>
          {referees.map((r) => <option key={r.id} value={r.id}>{r.firstName} {r.lastName}</option>)}
        </select>
      </FormField>
      <div className="form-row">
        <FormField label="Fecha" required error={errors.matchDate}>
          <input type="date" value={form.matchDate} onChange={(e) => setForm({ ...form, matchDate: e.target.value })} />
        </FormField>
        <FormField label="Jornada" required error={errors.matchday}>
          <input type="number" min={1} value={form.matchday} onChange={(e) => setForm({ ...form, matchday: parseInt(e.target.value) || 1 })} />
        </FormField>
      </div>
      <FormField label="Sede">
        <input type="text" value={form.venue || ''} maxLength={150} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
      </FormField>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{initialData ? 'Actualizar' : 'Crear'}</button>
      </div>
    </form>
  );
}
