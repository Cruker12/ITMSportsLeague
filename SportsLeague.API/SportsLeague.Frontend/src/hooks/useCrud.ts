import { useState, useCallback } from 'react';
import type { PagedResult, PaginationParams } from '../types/api';

interface UseCrudOptions<TRequest, TResponse> {
  getAll: (params: PaginationParams) => Promise<{ data: PagedResult<TResponse> }>;
  getById: (id: number) => Promise<{ data: TResponse }>;
  create: (data: TRequest) => Promise<{ data: TResponse }>;
  update: (id: number, data: TRequest) => Promise<unknown>;
  delete: (id: number) => Promise<unknown>;
  onSuccess?: (action: 'create' | 'update' | 'delete') => void;
  onError?: (message: string) => void;
}

interface UseCrudResult<TRequest, TResponse> {
  items: TResponse[];
  selectedItem: TResponse | null;
  totalCount: number;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
  fetchAll: () => Promise<void>;
  fetchById: (id: number) => Promise<void>;
  createItem: (data: TRequest) => Promise<boolean>;
  updateItem: (id: number, data: TRequest) => Promise<boolean>;
  removeItem: (id: number) => Promise<boolean>;
  clearError: () => void;
}

export function useCrud<TRequest, TResponse>(
  options: UseCrudOptions<TRequest, TResponse>
): UseCrudResult<TRequest, TResponse> {
  const [items, setItems] = useState<TResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<TResponse | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await options.getAll({ page, pageSize });
      setItems(response.data.items);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al cargar datos';
      setError(msg);
      options.onError?.(msg);
    } finally {
      setLoading(false);
    }
  }, [page, options]);

  const fetchById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await options.getById(id);
      setSelectedItem(response.data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al cargar registro';
      setError(msg);
      options.onError?.(msg);
    } finally {
      setLoading(false);
    }
  }, [options]);

  const createItem = useCallback(async (data: TRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await options.create(data);
      await fetchAll();
      options.onSuccess?.('create');
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al crear registro';
      setError(msg);
      options.onError?.(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [options, fetchAll]);

  const updateItem = useCallback(async (id: number, data: TRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await options.update(id, data);
      await fetchAll();
      options.onSuccess?.('update');
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al actualizar registro';
      setError(msg);
      options.onError?.(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [options, fetchAll]);

  const removeItem = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await options.delete(id);
      await fetchAll();
      options.onSuccess?.('delete');
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al eliminar registro';
      setError(msg);
      options.onError?.(msg);
      return false;
    } finally {
      setLoading(false);
    }
  }, [options, fetchAll]);

  const clearError = useCallback(() => setError(null), []);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    items,
    selectedItem,
    totalCount,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    setPage,
    fetchAll,
    fetchById,
    createItem,
    updateItem,
    removeItem,
    clearError,
  };
}
