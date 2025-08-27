// Respuesta de paginación genérica
export interface PaginationResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Información de paginación
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Parámetros de paginación
export interface PaginationParams {
  page: number;
  limit: number;
}

// Opciones de filtros para productos
export interface FilterOptions extends PaginationParams {
  search?: string;
  sort?: 'price' | 'name';
  order?: 'asc' | 'desc';
  available?: boolean;
  category?: string;
}

// Constantes de paginación
export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 12,
  maxLimit: 100,
} as const;
