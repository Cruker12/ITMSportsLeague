import { useState } from 'react';
import FormField from '../ui/FormField';
import type { SponsorRequest, SponsorResponse } from '../../types/sponsor';
import { SponsorCategory } from '../../utils/constants';

interface SponsorFormProps {
  initialData?: SponsorResponse;
  onSubmit: (data: SponsorRequest) => void;
  onCancel: () => void;
}

interface FormErrors {
  name?: string;
  contactEmail?: string;
}

export default function SponsorForm({ initialData, onSubmit, onCancel }: SponsorFormProps) {
  const [form, setForm] = useState<SponsorRequest>({
    name: initialData?.name || '',
    contactEmail: initialData?.contactEmail || '',
    phone: initialData?.phone || '',
    websiteUrl: initialData?.websiteUrl || '',
    category: initialData?.category ?? SponsorCategory.Bronze,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio';
    if (!form.contactEmail.trim()) e.contactEmail = 'El email es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) e.contactEmail = 'Email invalido';
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
      <FormField label="Email de Contacto" required error={errors.contactEmail}>
        <input type="email" value={form.contactEmail} maxLength={200} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
      </FormField>
      <div className="form-row">
        <FormField label="Telefono">
          <input type="text" value={form.phone || ''} maxLength={30} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </FormField>
        <FormField label="Sitio Web">
          <input type="url" value={form.websiteUrl || ''} maxLength={500} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} />
        </FormField>
      </div>
      <FormField label="Categoria" required>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: parseInt(e.target.value) as SponsorCategory })}>
          <option value={SponsorCategory.Main}>Principal</option>
          <option value={SponsorCategory.Gold}>Oro</option>
          <option value={SponsorCategory.Silver}>Plata</option>
          <option value={SponsorCategory.Bronze}>Bronce</option>
        </select>
      </FormField>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{initialData ? 'Actualizar' : 'Crear'}</button>
      </div>
    </form>
  );
}
