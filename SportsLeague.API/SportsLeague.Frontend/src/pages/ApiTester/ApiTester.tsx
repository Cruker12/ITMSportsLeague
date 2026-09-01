import { useState } from 'react';
import apiClient from '../../api/client';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestHistory {
  id: number;
  method: HttpMethod;
  url: string;
  status: number;
  time: number;
}

export default function ApiTester() {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState('/api/team');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<string>('');
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const [historyId, setHistoryId] = useState(1);

  const handleSend = async () => {
    setLoading(true);
    setResponse('');
    setStatus(null);
    const startTime = Date.now();

    try {
      const config: Record<string, unknown> = { method: method.toLowerCase() };
      if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
        config.data = JSON.parse(body);
      }

      const res = await apiClient.request({ ...config, url } as any);
      const elapsed = Date.now() - startTime;

      setStatus(res.status);
      setResponse(JSON.stringify(res.data, null, 2));

      setHistory((prev) => [
        { id: historyId, method, url, status: res.status, time: elapsed },
        ...prev.slice(0, 19),
      ]);
      setHistoryId((prev) => prev + 1);
    } catch (err: unknown) {
      const elapsed = Date.now() - startTime;
      const axiosError = err as { response?: { status: number; data: unknown }; message?: string };
      const errorStatus = axiosError.response?.status || 0;
      const errorData = axiosError.response?.data || axiosError.message || 'Error';
      setStatus(errorStatus);
      setResponse(JSON.stringify(errorData, null, 2));

      setHistory((prev) => [
        { id: historyId, method, url, status: errorStatus, time: elapsed },
        ...prev.slice(0, 19),
      ]);
      setHistoryId((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Probador de API</h1>

      <div className="tester-request">
        <div className="tester-row">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            className="tester-method"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="/api/endpoint"
            className="tester-url"
          />
          <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

        {['POST', 'PUT', 'PATCH'].includes(method) && (
          <div className="tester-body">
            <label>Body (JSON):</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{"key": "value"}'
              rows={8}
              className="tester-textarea"
            />
          </div>
        )}
      </div>

      {status !== null && (
        <div className="tester-response">
          <div className={`tester-status ${status >= 200 && status < 300 ? 'success' : 'error'}`}>
            Status: {status}
          </div>
          <pre className="tester-output">{response}</pre>
        </div>
      )}

      {history.length > 0 && (
        <div className="tester-history">
          <h3>Historial</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Metodo</th>
                <th>URL</th>
                <th>Status</th>
                <th>Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td><span className={`method-badge ${h.method.toLowerCase()}`}>{h.method}</span></td>
                  <td>{h.url}</td>
                  <td className={h.status >= 200 && h.status < 300 ? 'text-success' : 'text-error'}>
                    {h.status}
                  </td>
                  <td>{h.time}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

