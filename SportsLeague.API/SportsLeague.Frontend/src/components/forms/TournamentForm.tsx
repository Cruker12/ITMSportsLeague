import { useState } from 'react';
import FormField from '../ui/FormField';
import type { TournamentRequest, TournamentResponse } from '../../types/tournament';

interface TournamentFormProps {
  initialData?: TournamentResponse;
  onSubmit: (data: TournamentRequest) => void;
  onCancel: () => void;
}

interface FormErrors {
  name?: string;
  season?: string;
  startDate?: string;
  endDate?: string;
}

export default function TournamentForm({ initialData, onSubmit, onCancel }: TournamentFormProps) {
  const [form, setForm] = useState<TournamentRequest>({
    name: initialData?.name || '',
    season: initialData?.season || '',
    startDate: initialData?.startDate?.split('T')[0] || '',
    endDate: initialData?.endDate?.split('T')[0] || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio';
    if (!form.season.trim()) e.season = 'La temporada es obligatoria';
    else if (!/^\d{4}-\d{4}$/.test(form.season)) e.season = 'Formato: AAAA-AAAA (ej: 2025-2026)';
    if (!form.startDate) e.startDate = 'La fecha de inicio es obligatoria';
    if (!form.endDate) e.endDate = 'La fecha de fin es obligatoria';
    else if (form.startDate && form.endDate && new Date(form.endDate) <= new Date(form.startDate)) e.endDate = 'Debe ser posterior a la fecha de inicio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <FormField label="Nombre" required error={errors.name}>
        <input type="text" value={form.name} maxLength={150} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </FormField>
      <FormField label="Temporada" required error={errors.season}>
        <input type="text" value={form.season} maxLength={20} placeholder="2025-2026" onChange={(e) => setForm({ ...form, season: e.target.value })} />
      </FormField>
      <div className="form-row">
        <FormField label="Fecha Inicio" required error={errors.startDate}>
          <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        </FormField>
        <FormField label="Fecha Fin" required error={errors.endDate}>
          <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        </FormField>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{initialData ? 'Actualizar' : 'Crear'}</button>
      </div>
    </form>
  );
}
