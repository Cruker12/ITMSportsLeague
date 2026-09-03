import { useState } from 'react';
import FormField from '../ui/FormField';
import type { TeamRequest, TeamResponse } from '../../types/team';

interface TeamFormProps {
  initialData?: TeamResponse;
  onSubmit: (data: TeamRequest) => void;
  onCancel: () => void;
}

interface FormErrors {
  name?: string;
  city?: string;
  foundedDate?: string;
  logoUrl?: string;
}

export default function TeamForm({ initialData, onSubmit, onCancel }: TeamFormProps) {
  const [form, setForm] = useState<TeamRequest>({
    name: initialData?.name || '',
    city: initialData?.city || '',
    stadium: initialData?.stadium || '',
    logoUrl: initialData?.logoUrl || '',
    foundedDate: initialData?.foundedDate?.split('T')[0] || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio';
    if (!form.city.trim()) e.city = 'La ciudad es obligatoria';
    if (!form.foundedDate) e.foundedDate = 'La fecha es obligatoria';
    else if (new Date(form.foundedDate) >= new Date()) e.foundedDate = 'La fecha debe ser en el pasado';
    if (form.logoUrl && !/^https?:\/\/.+/.test(form.logoUrl)) e.logoUrl = 'URL inválida';
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
        <input type="text" value={form.name} maxLength={100} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </FormField>
      <FormField label="Ciudad" required error={errors.city}>
        <input type="text" value={form.city} maxLength={100} onChange={(e) => setForm({ ...form, city: e.target.value })} />
      </FormField>
      <FormField label="Estadio">
        <input type="text" value={form.stadium || ''} maxLength={150} onChange={(e) => setForm({ ...form, stadium: e.target.value })} />
      </FormField>
      <FormField label="URL Logo" error={errors.logoUrl}>
        <input type="url" value={form.logoUrl || ''} maxLength={500} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
      </FormField>
      <FormField label="Fecha Fundacion" required error={errors.foundedDate}>
        <input type="date" value={form.foundedDate} onChange={(e) => setForm({ ...form, foundedDate: e.target.value })} />
      </FormField>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{initialData ? 'Actualizar' : 'Crear'}</button>
      </div>
    </form>
  );
}
