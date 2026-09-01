import { useState } from 'react';
import type { MatchResultRequest } from '../../types/match';

interface MatchResultFormProps {
  initialData?: { homeGoals: number; awayGoals: number; observations?: string | null };
  onSubmit: (data: MatchResultRequest) => void;
  onCancel: () => void;
}

export default function MatchResultForm({ initialData, onSubmit, onCancel }: MatchResultFormProps) {
  const [form, setForm] = useState<MatchResultRequest>({
    homeGoals: initialData?.homeGoals || 0,
    awayGoals: initialData?.awayGoals || 0,
    observations: initialData?.observations || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
        <div className="form-group">
          <label>Goles Local *</label>
          <input
            type="number"
            value={form.homeGoals}
            onChange={(e) => setForm({ ...form, homeGoals: parseInt(e.target.value) || 0 })}
            min={0}
            max={100}
            required
          />
        </div>
        <div className="form-group">
          <label>Goles Visitante *</label>
          <input
            type="number"
            value={form.awayGoals}
            onChange={(e) => setForm({ ...form, awayGoals: parseInt(e.target.value) || 0 })}
            min={0}
            max={100}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Observaciones</label>
        <textarea
          value={form.observations || ''}
          onChange={(e) => setForm({ ...form, observations: e.target.value })}
          maxLength={500}
          rows={3}
        />
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Actualizar Resultado' : 'Registrar Resultado'}
        </button>
      </div>
    </form>
  );
}
