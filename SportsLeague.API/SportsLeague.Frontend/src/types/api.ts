export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
}
