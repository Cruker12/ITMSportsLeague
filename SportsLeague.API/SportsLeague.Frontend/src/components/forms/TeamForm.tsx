import { useState } from 'react';
import type { TeamRequest, TeamResponse } from '../../types/team';

interface TeamFormProps {
  initialData?: TeamResponse;
  onSubmit: (data: TeamRequest) => void;
  onCancel: () => void;
}

export default function TeamForm({ initialData, onSubmit, onCancel }: TeamFormProps) {
  const [form, setForm] = useState<TeamRequest>({
    name: initialData?.name || '',
    city: initialData?.city || '',
    stadium: initialData?.stadium || '',
    logoUrl: initialData?.logoUrl || '',
    foundedDate: initialData?.foundedDate?.split('T')[0] || '',
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
          maxLength={100}
        />
      </div>
      <div className="form-group">
        <label>Ciudad *</label>
        <input
          type="text"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
          maxLength={100}
        />
      </div>
      <div className="form-group">
        <label>Estadio</label>
        <input
          type="text"
          value={form.stadium}
          onChange={(e) => setForm({ ...form, stadium: e.target.value })}
          maxLength={150}
        />
      </div>
      <div className="form-group">
        <label>URL Logo</label>
        <input
          type="url"
          value={form.logoUrl || ''}
          onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          maxLength={500}
        />
      </div>
      <div className="form-group">
        <label>Fecha Fundacion *</label>
        <input
          type="date"
          value={form.foundedDate}
          onChange={(e) => setForm({ ...form, foundedDate: e.target.value })}
          required
        />
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
