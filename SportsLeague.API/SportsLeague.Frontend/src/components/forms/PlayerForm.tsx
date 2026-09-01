import { useState } from 'react';
import type { PlayerRequest, PlayerResponse } from '../../types/player';
import { PlayerPosition } from '../../utils/constants';

interface PlayerFormProps {
  initialData?: PlayerResponse;
  teams: { id: number; name: string }[];
  onSubmit: (data: PlayerRequest) => void;
  onCancel: () => void;
}

export default function PlayerForm({ initialData, teams, onSubmit, onCancel }: PlayerFormProps) {
  const [form, setForm] = useState<PlayerRequest>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    birthDate: initialData?.birthDate?.split('T')[0] || '',
    number: initialData?.number || 1,
    position: initialData?.position ?? PlayerPosition.Forward,
    teamId: initialData?.teamId || (teams.length > 0 ? teams[0].id : 0),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-row">
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
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Fecha Nacimiento *</label>
          <input
            type="date"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Numero *</label>
          <input
            type="number"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: parseInt(e.target.value) || 1 })}
            min={1}
            max={99}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Posicion *</label>
          <select
            value={form.position}
            onChange={(e) => setForm({ ...form, position: parseInt(e.target.value) as PlayerPosition })}
          >
            <option value={PlayerPosition.Goalkeeper}>Portero</option>
            <option value={PlayerPosition.Defender}>Defensa</option>
            <option value={PlayerPosition.Midfielder}>Mediocampista</option>
            <option value={PlayerPosition.Forward}>Delantero</option>
          </select>
        </div>
        <div className="form-group">
          <label>Equipo *</label>
          <select
            value={form.teamId}
            onChange={(e) => setForm({ ...form, teamId: parseInt(e.target.value) })}
          >
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
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
