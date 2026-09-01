import { useState } from 'react';
import type { GoalRequest } from '../../types/matchEvent';
import { GoalType } from '../../utils/constants';

interface GoalFormProps {
  players: { id: number; firstName: string; lastName: string }[];
  onSubmit: (data: GoalRequest) => void;
  onCancel: () => void;
}

export default function GoalForm({ players, onSubmit, onCancel }: GoalFormProps) {
  const [form, setForm] = useState<GoalRequest>({
    playerId: players.length > 0 ? players[0].id : 0,
    minute: 1,
    type: GoalType.Normal,
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
            onChange={(e) => setForm({ ...form, type: parseInt(e.target.value) as GoalType })}
          >
            <option value={GoalType.Normal}>Normal</option>
            <option value={GoalType.Penalty}>Penalti</option>
            <option value={GoalType.OwnGoal}>Autogol</option>
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Registrar Gol
        </button>
      </div>
    </form>
  );
}
