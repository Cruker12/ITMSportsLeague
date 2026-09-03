import { useState } from 'react';
import apiClient from '../../api/client';
import '../../index.css';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface EndpointParam {
  name: string;
  type: 'path' | 'query' | 'body';
  required?: boolean;
  description?: string;
}

interface EndpointDef {
  method: HttpMethod;
  path: string;
  description: string;
  group: string;
  params?: EndpointParam[];
  bodyTemplate?: string;
}

const endpoints: EndpointDef[] = [
  // Teams
  { method: 'GET', path: '/api/team', description: 'Listar equipos', group: 'Teams', params: [{ name: 'page', type: 'query', description: 'Pagina' }, { name: 'pageSize', type: 'query', description: 'Tamaño de pagina' }] },
  { method: 'GET', path: '/api/team/{id}', description: 'Obtener equipo por ID', group: 'Teams', params: [{ name: 'id', type: 'path', required: true, description: 'ID del equipo' }] },
  { method: 'POST', path: '/api/team', description: 'Crear equipo', group: 'Teams', bodyTemplate: '{\n  "name": "",\n  "city": "",\n  "stadium": "",\n  "foundedDate": "2020-01-01"\n}' },
  { method: 'PUT', path: '/api/team/{id}', description: 'Actualizar equipo', group: 'Teams', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "name": "",\n  "city": "",\n  "stadium": "",\n  "foundedDate": "2020-01-01"\n}' },
  { method: 'DELETE', path: '/api/team/{id}', description: 'Eliminar equipo', group: 'Teams', params: [{ name: 'id', type: 'path', required: true }] },

  // Players
  { method: 'GET', path: '/api/player', description: 'Listar jugadores', group: 'Players', params: [{ name: 'page', type: 'query' }, { name: 'pageSize', type: 'query' }] },
  { method: 'GET', path: '/api/player/{id}', description: 'Obtener jugador', group: 'Players', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'GET', path: '/api/player/team/{teamId}', description: 'Jugadores por equipo', group: 'Players', params: [{ name: 'teamId', type: 'path', required: true }] },
  { method: 'POST', path: '/api/player', description: 'Crear jugador', group: 'Players', bodyTemplate: '{\n  "firstName": "",\n  "lastName": "",\n  "birthDate": "2000-01-01",\n  "number": 10,\n  "position": 2,\n  "teamId": 1\n}' },
  { method: 'PUT', path: '/api/player/{id}', description: 'Actualizar jugador', group: 'Players', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "firstName": "",\n  "lastName": "",\n  "birthDate": "2000-01-01",\n  "number": 10,\n  "position": 2,\n  "teamId": 1\n}' },
  { method: 'DELETE', path: '/api/player/{id}', description: 'Eliminar jugador', group: 'Players', params: [{ name: 'id', type: 'path', required: true }] },

  // Referees
  { method: 'GET', path: '/api/referee', description: 'Listar arbitros', group: 'Referees', params: [{ name: 'page', type: 'query' }, { name: 'pageSize', type: 'query' }] },
  { method: 'GET', path: '/api/referee/{id}', description: 'Obtener arbitro', group: 'Referees', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'POST', path: '/api/referee', description: 'Crear arbitro', group: 'Referees', bodyTemplate: '{\n  "firstName": "",\n  "lastName": "",\n  "nationality": ""\n}' },
  { method: 'PUT', path: '/api/referee/{id}', description: 'Actualizar arbitro', group: 'Referees', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "firstName": "",\n  "lastName": "",\n  "nationality": ""\n}' },
  { method: 'DELETE', path: '/api/referee/{id}', description: 'Eliminar arbitro', group: 'Referees', params: [{ name: 'id', type: 'path', required: true }] },

  // Tournaments
  { method: 'GET', path: '/api/tournament', description: 'Listar torneos', group: 'Tournaments', params: [{ name: 'page', type: 'query' }, { name: 'pageSize', type: 'query' }] },
  { method: 'GET', path: '/api/tournament/{id}', description: 'Obtener torneo', group: 'Tournaments', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'POST', path: '/api/tournament', description: 'Crear torneo', group: 'Tournaments', bodyTemplate: '{\n  "name": "",\n  "season": "2025-2026",\n  "startDate": "2025-01-01",\n  "endDate": "2025-12-31"\n}' },
  { method: 'PUT', path: '/api/tournament/{id}', description: 'Actualizar torneo', group: 'Tournaments', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "name": "",\n  "season": "2025-2026",\n  "startDate": "2025-01-01",\n  "endDate": "2025-12-31"\n}' },
  { method: 'DELETE', path: '/api/tournament/{id}', description: 'Eliminar torneo', group: 'Tournaments', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'PATCH', path: '/api/tournament/{id}/status', description: 'Cambiar estado', group: 'Tournaments', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "status": 1\n}' },
  { method: 'POST', path: '/api/tournament/{id}/teams', description: 'Inscribir equipo', group: 'Tournaments', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "teamId": 1\n}' },
  { method: 'GET', path: '/api/tournament/{id}/teams', description: 'Equipos inscritos', group: 'Tournaments', params: [{ name: 'id', type: 'path', required: true }] },

  // Matches
  { method: 'GET', path: '/api/match/tournament/{tournamentId}', description: 'Partidos por torneo', group: 'Matches', params: [{ name: 'tournamentId', type: 'path', required: true }, { name: 'page', type: 'query' }, { name: 'pageSize', type: 'query' }] },
  { method: 'GET', path: '/api/match/{id}', description: 'Obtener partido', group: 'Matches', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'POST', path: '/api/match', description: 'Crear partido', group: 'Matches', bodyTemplate: '{\n  "tournamentId": 1,\n  "homeTeamId": 1,\n  "awayTeamId": 2,\n  "refereeId": 1,\n  "matchDate": "2025-06-01",\n  "matchday": 1\n}' },
  { method: 'PUT', path: '/api/match/{id}', description: 'Actualizar partido', group: 'Matches', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "tournamentId": 1,\n  "homeTeamId": 1,\n  "awayTeamId": 2,\n  "refereeId": 1,\n  "matchDate": "2025-06-01",\n  "matchday": 1\n}' },
  { method: 'DELETE', path: '/api/match/{id}', description: 'Eliminar partido', group: 'Matches', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'PATCH', path: '/api/match/{id}/status', description: 'Cambiar estado partido', group: 'Matches', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "status": 1\n}' },

  // Match Events
  { method: 'GET', path: '/api/match/{matchId}/result', description: 'Obtener resultado', group: 'Match Events', params: [{ name: 'matchId', type: 'path', required: true }] },
  { method: 'POST', path: '/api/match/{matchId}/result', description: 'Registrar resultado', group: 'Match Events', params: [{ name: 'matchId', type: 'path', required: true }], bodyTemplate: '{\n  "homeGoals": 2,\n  "awayGoals": 1,\n  "observations": ""\n}' },
  { method: 'GET', path: '/api/match/{matchId}/goals', description: 'Goles del partido', group: 'Match Events', params: [{ name: 'matchId', type: 'path', required: true }] },
  { method: 'POST', path: '/api/match/{matchId}/goals', description: 'Registrar gol', group: 'Match Events', params: [{ name: 'matchId', type: 'path', required: true }], bodyTemplate: '{\n  "playerId": 1,\n  "minute": 45,\n  "type": 0\n}' },
  { method: 'DELETE', path: '/api/match/{matchId}/goals/{goalId}', description: 'Eliminar gol', group: 'Match Events', params: [{ name: 'matchId', type: 'path', required: true }, { name: 'goalId', type: 'path', required: true }] },
  { method: 'GET', path: '/api/match/{matchId}/cards', description: 'Tarjetas del partido', group: 'Match Events', params: [{ name: 'matchId', type: 'path', required: true }] },
  { method: 'POST', path: '/api/match/{matchId}/cards', description: 'Registrar tarjeta', group: 'Match Events', params: [{ name: 'matchId', type: 'path', required: true }], bodyTemplate: '{\n  "playerId": 1,\n  "minute": 30,\n  "type": 0\n}' },
  { method: 'DELETE', path: '/api/match/{matchId}/cards/{cardId}', description: 'Eliminar tarjeta', group: 'Match Events', params: [{ name: 'matchId', type: 'path', required: true }, { name: 'cardId', type: 'path', required: true }] },

  // Sponsors
  { method: 'GET', path: '/api/sponsor', description: 'Listar patrocinadores', group: 'Sponsors' },
  { method: 'GET', path: '/api/sponsor/{id}', description: 'Obtener patrocinador', group: 'Sponsors', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'POST', path: '/api/sponsor', description: 'Crear patrocinador', group: 'Sponsors', bodyTemplate: '{\n  "name": "",\n  "contactEmail": "",\n  "phone": "",\n  "category": 0\n}' },
  { method: 'PUT', path: '/api/sponsor/{id}', description: 'Actualizar patrocinador', group: 'Sponsors', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "name": "",\n  "contactEmail": "",\n  "phone": "",\n  "category": 0\n}' },
  { method: 'DELETE', path: '/api/sponsor/{id}', description: 'Eliminar patrocinador', group: 'Sponsors', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'GET', path: '/api/sponsor/{id}/tournaments', description: 'Torneos del patrocinador', group: 'Sponsors', params: [{ name: 'id', type: 'path', required: true }] },
  { method: 'POST', path: '/api/sponsor/{id}/tournaments', description: 'Vincular a torneo', group: 'Sponsors', params: [{ name: 'id', type: 'path', required: true }], bodyTemplate: '{\n  "tournamentId": 1,\n  "contractAmount": 10000\n}' },
  { method: 'DELETE', path: '/api/sponsor/{id}/tournaments/{tournamentId}', description: 'Desvincular de torneo', group: 'Sponsors', params: [{ name: 'id', type: 'path', required: true }, { name: 'tournamentId', type: 'path', required: true }] },

  // Standings & Stats
  { method: 'GET', path: '/api/standings', description: 'Tabla de posiciones', group: 'Stats', params: [{ name: 'tournamentId', type: 'query', required: true }] },
  { method: 'GET', path: '/api/stats/scorers', description: 'Ranking goleadores', group: 'Stats', params: [{ name: 'tournamentId', type: 'query', required: true }] },
  { method: 'GET', path: '/api/stats/cards', description: 'Ranking tarjetas', group: 'Stats', params: [{ name: 'tournamentId', type: 'query', required: true }] },

  // Health
  { method: 'GET', path: '/health', description: 'Health check', group: 'Infrastructure' },
];

const methodColors: Record<HttpMethod, string> = {
  GET: 'var(--info)',
  POST: 'var(--success)',
  PUT: 'var(--warning)',
  PATCH: '#8b5cf6',
  DELETE: 'var(--danger)',
};

interface RequestHistory {
  id: number;
  method: HttpMethod;
  url: string;
  status: number;
  time: number;
}

export default function ApiTester() {
  const [selected, setSelected] = useState<EndpointDef>(endpoints[0]);
  const [pathValues, setPathValues] = useState<Record<string, string>>({});
  const [queryValues, setQueryValues] = useState<Record<string, string>>({});
  const [body, setBody] = useState(selected.bodyTemplate || '');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [historyId, setHistoryId] = useState(1);
  const [expandedGroup, setExpandedGroup] = useState<string | null>('Teams');

  const groups = [...new Set(endpoints.map((e) => e.group))];

  const buildUrl = () => {
    let url = selected.path;
    selected.params?.filter((p) => p.type === 'path').forEach((p) => {
      url = url.replace(`{${p.name}}`, pathValues[p.name] || `{${p.name}}`);
    });
    const queryParts = selected.params?.filter((p) => p.type === 'query' && queryValues[p.name]).map((p) => `${p.name}=${queryValues[p.name]}`);
    if (queryParts?.length) url += '?' + queryParts.join('&');
    return url;
  };

  const handleSelect = (ep: EndpointDef) => {
    setSelected(ep);
    setBody(ep.bodyTemplate || '');
    setPathValues({});
    setQueryValues({});
    setResponse('');
    setStatus(null);
  };

  const handleSend = async () => {
    setLoading(true);
    setResponse('');
    setStatus(null);
    const startTime = Date.now();
    const url = buildUrl();

    try {
      const config: Record<string, unknown> = { method: selected.method.toLowerCase(), url };
      if (['post', 'put', 'patch'].includes(selected.method.toLowerCase()) && body) {
        config.data = JSON.parse(body);
      }
      const res = await apiClient.request(config as never);
      const elapsed = Date.now() - startTime;
      setStatus(res.status);
      setResponse(JSON.stringify(res.data, null, 2));
      setHistory((prev) => [{ id: historyId, method: selected.method, url, status: res.status, time: elapsed }, ...prev.slice(0, 19)]);
      setHistoryId((prev) => prev + 1);
    } catch (err: unknown) {
      const elapsed = Date.now() - startTime;
      const axiosErr = err as { response?: { status: number; data: unknown }; message?: string };
      const errorStatus = axiosErr.response?.status || 0;
      const errorData = axiosErr.response?.data || axiosErr.message || 'Error';
      setStatus(errorStatus);
      setResponse(JSON.stringify(errorData, null, 2));
      setHistory((prev) => [{ id: historyId, method: selected.method, url, status: errorStatus, time: elapsed }, ...prev.slice(0, 19)]);
      setHistoryId((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const pathParams = selected.params?.filter((p) => p.type === 'path') || [];
  const queryParams = selected.params?.filter((p) => p.type === 'query') || [];
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(selected.method);

  return (
    <div className="api-tester">
      {/* Left panel — endpoint list */}
      <aside className="tester-sidebar">
        <h2>API Endpoints</h2>
        <div className="tester-groups">
          {groups.map((group) => (
            <div key={group} className="tester-group">
              <button className={`tester-group-header ${expandedGroup === group ? 'expanded' : ''}`} onClick={() => setExpandedGroup(expandedGroup === group ? null : group)}>
                <span>{group}</span>
                <span>{expandedGroup === group ? '−' : '+'}</span>
              </button>
              {expandedGroup === group && (
                <ul className="tester-endpoint-list">
                  {endpoints.filter((e) => e.group === group).map((ep, i) => (
                    <li key={i} className={`tester-endpoint-item ${selected === ep ? 'active' : ''}`} onClick={() => handleSelect(ep)}>
                      <span className="method-badge-sm" style={{ background: methodColors[ep.method] }}>{ep.method}</span>
                      <span className="endpoint-path">{ep.path}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Right panel — request + response */}
      <main className="tester-main">
        <div className="tester-request-panel">
          <div className="tester-url-bar">
            <span className="method-badge-lg" style={{ background: methodColors[selected.method] }}>{selected.method}</span>
            <input type="text" value={buildUrl()} readOnly className="tester-url-input" />
            <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>

          <p className="endpoint-desc">{selected.description}</p>

          {/* Path params */}
          {pathParams.length > 0 && (
            <div className="params-section">
              <h4>Path Parameters</h4>
              {pathParams.map((p) => (
                <div key={p.name} className="param-row">
                  <label>{p.name} {p.required && <span className="required-dot">*</span>}</label>
                  <input type="text" placeholder={p.description || p.name} value={pathValues[p.name] || ''} onChange={(e) => setPathValues({ ...pathValues, [p.name]: e.target.value })} />
                </div>
              ))}
            </div>
          )}

          {/* Query params */}
          {queryParams.length > 0 && (
            <div className="params-section">
              <h4>Query Parameters</h4>
              {queryParams.map((p) => (
                <div key={p.name} className="param-row">
                  <label>{p.name}</label>
                  <input type="text" placeholder={p.description || p.name} value={queryValues[p.name] || ''} onChange={(e) => setQueryValues({ ...queryValues, [p.name]: e.target.value })} />
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          {hasBody && (
            <div className="params-section">
              <h4>Request Body (JSON)</h4>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10} className="tester-body-input" placeholder='{"key": "value"}' />
            </div>
          )}
        </div>

        {/* Response */}
        {status !== null && (
          <div className="tester-response-panel">
            <div className="response-header">
              <h4>Response</h4>
              <span className={`status-badge ${status >= 200 && status < 300 ? 'status-ok' : 'status-err'}`}>{status}</span>
            </div>
            <pre className="response-body">{response}</pre>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="tester-history-panel">
            <h4>Historial</h4>
            <table className="data-table">
              <thead>
                <tr><th>Metodo</th><th>URL</th><th>Status</th><th>Tiempo</th></tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id}>
                    <td><span className="method-badge-sm" style={{ background: methodColors[h.method] }}>{h.method}</span></td>
                    <td className="history-url">{h.url}</td>
                    <td className={h.status >= 200 && h.status < 300 ? 'text-success' : 'text-error'}>{h.status}</td>
                    <td>{h.time}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
