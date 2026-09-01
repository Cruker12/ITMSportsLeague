interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  getKey?: (item: T) => string | number;
}

export default function DataTable<T>({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  onView,
  getKey,
}: DataTableProps<T>) {
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (data.length === 0) {
    return <div className="empty-state">No hay registros para mostrar</div>;
  }

  const getRowKey = getKey || ((item: T) => {
    const record = item as Record<string, unknown>;
    return (record.id as string | number) || JSON.stringify(item);
  });

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
            {(onEdit || onDelete || onView) && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={getRowKey(item)}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
              {(onEdit || onDelete || onView) && (
                <td className="actions">
                  {onView && (
                    <button className="btn btn-sm btn-info" onClick={() => onView(item)}>
                      Ver
                    </button>
                  )}
                  {onEdit && (
                    <button className="btn btn-sm btn-primary" onClick={() => onEdit(item)}>
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(item)}>
                      Eliminar
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
