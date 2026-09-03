import { useState, useEffect } from 'react';
import FormField from '../ui/FormField';
import { teamApi } from '../../api/team';
import type { PlayerRequest, PlayerResponse } from '../../types/player';
import type { TeamResponse } from '../../types/team';
import { PlayerPosition } from '../../utils/constants';

interface PlayerFormProps {
  initialData?: PlayerResponse;
  onSubmit: (data: PlayerRequest) => void;
  onCancel: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  number?: string;
  position?: string;
  teamId?: string;
}

export default function PlayerForm({ initialData, onSubmit, onCancel }: PlayerFormProps) {
  const [form, setForm] = useState<PlayerRequest>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    birthDate: initialData?.birthDate?.split('T')[0] || '',
    number: initialData?.number || 1,
    position: initialData?.position ?? PlayerPosition.Forward,
    teamId: initialData?.teamId || 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [teams, setTeams] = useState<TeamResponse[]>([]);

  useEffect(() => {
    teamApi.getAll({ pageSize: 100 }).then((r) => setTeams(r.data.items));
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.firstName.trim()) e.firstName = 'El nombre es obligatorio';
    if (!form.lastName.trim()) e.lastName = 'El apellido es obligatorio';
    if (!form.birthDate) e.birthDate = 'La fecha es obligatoria';
    else if (new Date(form.birthDate) >= new Date()) e.birthDate = 'La fecha debe ser en el pasado';
    if (form.number < 1 || form.number > 99) e.number = 'Numero entre 1 y 99';
    if (!form.teamId) e.teamId = 'Seleccione un equipo';
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
        <FormField label="Nombre" required error={errors.firstName}>
          <input type="text" value={form.firstName} maxLength={80} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        </FormField>
        <FormField label="Apellido" required error={errors.lastName}>
          <input type="text" value={form.lastName} maxLength={80} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        </FormField>
      </div>
      <FormField label="Fecha Nacimiento" required error={errors.birthDate}>
        <input type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
      </FormField>
      <div className="form-row">
        <FormField label="Numero" required error={errors.number}>
          <input type="number" min={1} max={99} value={form.number} onChange={(e) => setForm({ ...form, number: parseInt(e.target.value) || 1 })} />
        </FormField>
        <FormField label="Posicion" required>
          <select value={form.position} onChange={(e) => setForm({ ...form, position: parseInt(e.target.value) as PlayerPosition })}>
            <option value={PlayerPosition.Goalkeeper}>Portero</option>
            <option value={PlayerPosition.Defender}>Defensa</option>
            <option value={PlayerPosition.Midfielder}>Mediocampista</option>
            <option value={PlayerPosition.Forward}>Delantero</option>
          </select>
        </FormField>
      </div>
      <FormField label="Equipo" required error={errors.teamId}>
        <select value={form.teamId || ''} onChange={(e) => setForm({ ...form, teamId: parseInt(e.target.value) })}>
          <option value="">Seleccionar equipo...</option>
          {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </FormField>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">{initialData ? 'Actualizar' : 'Crear'}</button>
      </div>
    </form>
  );
}
