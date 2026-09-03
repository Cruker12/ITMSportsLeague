import { useState } from 'react';
import FormField from '../ui/FormField';
import type { RefereeRequest, RefereeResponse } from '../../types/referee';

interface RefereeFormProps {
  initialData?: RefereeResponse;
  onSubmit: (data: RefereeRequest) => void;
  onCancel: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  nationality?: string;
}

export default function RefereeForm({ initialData, onSubmit, onCancel }: RefereeFormProps) {
  const [form, setForm] = useState<RefereeRequest>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    nationality: initialData?.nationality || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = 'El nombre es obligatorio';
    if (!form.lastName.trim()) e.lastName = 'El apellido es obligatorio';
    if (!form.nationality.trim()) e.nationality = 'La nacionalidad es obligatoria';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <FormField label="Nombre" required error={errors.firstName}>
        <input type="text" value={form.firstName} maxLength={80} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
      </FormField>
      <FormField label="Apellido" required error={errors.lastName}>
        <input type="text" value={form.lastName} maxLength={80} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
      </FormField>
      <FormField label="Nacionalidad" required error={errors.nationality}>
        <input type="text" value={form.nationality} maxLength={80} onChange={(e) => setForm({ ...form, nationality: e.target.value })} />
      </FormField>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{initialData ? 'Actualizar' : 'Crear'}</button>
      </div>
    </form>
  );
}
