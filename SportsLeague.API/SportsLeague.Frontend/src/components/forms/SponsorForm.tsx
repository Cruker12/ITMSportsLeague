import { useState } from 'react';
import type { SponsorRequest, SponsorResponse } from '../../types/sponsor';
import { SponsorCategory } from '../../utils/constants';

interface SponsorFormProps {
  initialData?: SponsorResponse;
  onSubmit: (data: SponsorRequest) => void;
  onCancel: () => void;
}

export default function SponsorForm({ initialData, onSubmit, onCancel }: SponsorFormProps) {
  const [form, setForm] = useState<SponsorRequest>({
    name: initialData?.name || '',
    contactEmail: initialData?.contactEmail || '',
    phone: initialData?.phone || '',
    websiteUrl: initialData?.websiteUrl || '',
    category: initialData?.category ?? SponsorCategory.Bronze,
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
        <label>Email Contacto *</label>
        <input
          type="email"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
          required
          maxLength={200}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Telefono</label>
          <input
            type="tel"
            value={form.phone || ''}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            maxLength={30}
          />
        </div>
        <div className="form-group">
          <label>Categoria *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: parseInt(e.target.value) as SponsorCategory })}
          >
            <option value={SponsorCategory.Main}>Principal</option>
            <option value={SponsorCategory.Gold}>Oro</option>
            <option value={SponsorCategory.Silver}>Plata</option>
            <option value={SponsorCategory.Bronze}>Bronce</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Sitio Web</label>
        <input
          type="url"
          value={form.websiteUrl || ''}
          onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
          maxLength={500}
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
