import { useState } from 'react';
import FormField from '../ui/FormField';
import type { MatchResultRequest, MatchResultResponse } from '../../types/match';

interface MatchResultFormProps {
  initialData?: MatchResultResponse;
  onSubmit: (data: MatchResultRequest) => void;
  onCancel: () => void;
}

interface FormErrors {
  homeGoals?: string;
  awayGoals?: string;
}

export default function MatchResultForm({ initialData, onSubmit, onCancel }: MatchResultFormProps) {
  const [form, setForm] = useState<MatchResultRequest>({
    homeGoals: initialData?.homeGoals ?? 0,
    awayGoals: initialData?.awayGoals ?? 0,
    observations: initialData?.observations || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (form.homeGoals < 0 || form.homeGoals > 100) e.homeGoals = 'Goles entre 0 y 100';
    if (form.awayGoals < 0 || form.awayGoals > 100) e.awayGoals = 'Goles entre 0 y 100';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
        <FormField label="Goles Local" required error={errors.homeGoals}>
          <input type="number" min={0} max={100} value={form.homeGoals} onChange={(e) => setForm({ ...form, homeGoals: parseInt(e.target.value) || 0 })} />
        </FormField>
        <FormField label="Goles Visitante" required error={errors.awayGoals}>
          <input type="number" min={0} max={100} value={form.awayGoals} onChange={(e) => setForm({ ...form, awayGoals: parseInt(e.target.value) || 0 })} />
        </FormField>
      </div>
      <FormField label="Observaciones">
        <textarea value={form.observations || ''} maxLength={500} rows={3} onChange={(e) => setForm({ ...form, observations: e.target.value })} />
      </FormField>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{initialData ? 'Actualizar' : 'Registrar'}</button>
      </div>
    </form>
  );
}
