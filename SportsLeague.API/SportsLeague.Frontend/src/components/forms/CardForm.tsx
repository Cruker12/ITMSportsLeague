import { useState } from 'react';
import FormField from '../ui/FormField';
import type { CardRequest } from '../../types/matchEvent';
import type { PlayerResponse } from '../../types/player';
import { CardType } from '../../utils/constants';

interface CardFormProps {
  players: PlayerResponse[];
  onSubmit: (data: CardRequest) => void;
  onCancel: () => void;
}

interface FormErrors {
  playerId?: string;
  minute?: string;
}

export default function CardForm({ players, onSubmit, onCancel }: CardFormProps) {
  const [form, setForm] = useState<CardRequest>({
    playerId: 0,
    minute: 0,
    type: CardType.Yellow,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.playerId) e.playerId = 'Seleccione un jugador';
    if (form.minute < 0 || form.minute > 120) e.minute = 'Minuto entre 0 y 120';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <FormField label="Jugador" required error={errors.playerId}>
        <select value={form.playerId || ''} onChange={(e) => setForm({ ...form, playerId: parseInt(e.target.value) })}>
          <option value="">Seleccionar jugador...</option>
          {players.map((p) => <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>)}
        </select>
      </FormField>
      <div className="form-row">
        <FormField label="Minuto" required error={errors.minute}>
          <input type="number" min={0} max={120} value={form.minute} onChange={(e) => setForm({ ...form, minute: parseInt(e.target.value) || 0 })} />
        </FormField>
        <FormField label="Tipo" required>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: parseInt(e.target.value) as CardType })}>
            <option value={CardType.Yellow}>Amarilla</option>
            <option value={CardType.Red}>Roja</option>
          </select>
        </FormField>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Registrar Tarjeta</button>
      </div>
    </form>
  );
}
