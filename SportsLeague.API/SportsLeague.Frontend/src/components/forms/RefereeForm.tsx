import { useState } from 'react';
import type { RefereeRequest, RefereeResponse } from '../../types/referee';

interface RefereeFormProps {
  initialData?: RefereeResponse;
  onSubmit: (data: RefereeRequest) => void;
  onCancel: () => void;
}

export default function RefereeForm({ initialData, onSubmit, onCancel }: RefereeFormProps) {
  const [form, setForm] = useState<RefereeRequest>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    nationality: initialData?.nationality || '',
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
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          required
          maxLength={80}
        />
      </div>
      <div className="form-group">
        <label>Apellido *</label>
        <input
          type="text"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          required
          maxLength={80}
        />
      </div>
      <div className="form-group">
        <label>Nacionalidad *</label>
        <input
          type="text"
          value={form.nationality}
          onChange={(e) => setForm({ ...form, nationality: e.target.value })}
          required
          maxLength={80}
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
