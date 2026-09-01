import { useState } from 'react';
import type { CardRequest } from '../../types/matchEvent';
import { CardType } from '../../utils/constants';

interface CardFormProps {
  players: { id: number; firstName: string; lastName: string }[];
  onSubmit: (data: CardRequest) => void;
  onCancel: () => void;
}

export default function CardForm({ players, onSubmit, onCancel }: CardFormProps) {
  const [form, setForm] = useState<CardRequest>({
    playerId: players.length > 0 ? players[0].id : 0,
    minute: 1,
    type: CardType.Yellow,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Jugador *</label>
        <select
          value={form.playerId}
          onChange={(e) => setForm({ ...form, playerId: parseInt(e.target.value) })}
        >
          {players.map((p) => (
            <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Minuto *</label>
          <input
            type="number"
            value={form.minute}
            onChange={(e) => setForm({ ...form, minute: parseInt(e.target.value) || 0 })}
            min={0}
            max={120}
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo *</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: parseInt(e.target.value) as CardType })}
          >
            <option value={CardType.Yellow}>Amarilla</option>
            <option value={CardType.Red}>Roja</option>
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Registrar Tarjeta
        </button>
      </div>
    </form>
  );
}
