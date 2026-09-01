import { useState } from 'react';
import type { TournamentRequest, TournamentResponse } from '../../types/tournament';

interface TournamentFormProps {
  initialData?: TournamentResponse;
  onSubmit: (data: TournamentRequest) => void;
  onCancel: () => void;
}

export default function TournamentForm({ initialData, onSubmit, onCancel }: TournamentFormProps) {
  const [form, setForm] = useState<TournamentRequest>({
    name: initialData?.name || '',
    season: initialData?.season || '',
    startDate: initialData?.startDate?.split('T')[0] || '',
    endDate: initialData?.endDate?.split('T')[0] || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Nombre *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          maxLength={150}
        />
      </div>
      <div className="form-group">
        <label>Temporada *</label>
        <input
          type="text"
          value={form.season}
          onChange={(e) => setForm({ ...form, season: e.target.value })}
          required
          maxLength={20}
          placeholder="2025-2026"
          pattern="\d{4}-\d{4}"
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Fecha Inicio *</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha Fin *</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            required
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
