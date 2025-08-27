/**
 * Tipos compartidos entre API y Web
 * Este archivo contiene las interfaces y tipos que son comunes a ambos proyectos
 */

// ================================
// TIPOS DE PRODUCTO
// ================================

/**
 * Interfaz principal del producto
 * Representa la estructura base de un producto sin dependencias de Mongoose o React
 */
export interface Product {
  _id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Datos para crear un nuevo producto
 */
export interface CreateProductData {
  name: string;
  price: number;
  isAvailable?: boolean;
  category: string;
  image: string;
}

/**
 * Datos para actualizar un producto existente
 */
export interface UpdateProductData extends Partial<CreateProductData> {
  _id: string;
}

/**
 * Tipos para ordenamiento de productos
 */
export type SortField = 'price' | 'name' | 'createdAt' | 'updatedAt';
export type BasicSortField = 'price' | 'name'; // Para uso en API
export type SortOrder = 'asc' | 'desc';

/**
 * Categorías de productos disponibles
 */
export type ProductCategory =
  | 'electronics'
  | 'home'
  | 'clothing'
  | 'books'
  | 'sports'
  | 'toys'
  | 'food'
  | 'beauty'
  | 'other';

// ================================
// TIPOS DE PAGINACIÓN
// ================================

/**
 * Información de paginación
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Respuesta paginada genérica
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

/**
 * Parámetros básicos de paginación
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Opciones de filtrado y paginación para productos
 */
export interface ProductFilterOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: SortField;
  order?: SortOrder;
  available?: boolean;
  category?: ProductCategory | string;
}

/**
 * Opciones de filtrado específicas para el API backend (más restrictivas)
 */
export interface ApiProductFilterOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: BasicSortField;
  order?: SortOrder;
  available?: boolean;
  category?: ProductCategory | string;
}

/**
 * Constantes de paginación
 */
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MIN_PAGE: 1,
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
} as const;

// ================================
// TIPOS DE API
// ================================

/**
 * Respuesta estándar de la API
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * Error de la API
 */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Estados de carga asíncrona
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Resultado de operaciones asíncronas
 */
export interface AsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch?: () => void;
}

// ================================
// TIPOS DE VALIDACIÓN
// ================================

/**
 * Validador de tipo Product
 */
export const isValidProduct = (product: any): product is Product => {
  return (
    product &&
    typeof product._id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.isAvailable === 'boolean' &&
    typeof product.category === 'string' &&
    typeof product.image === 'string' &&
    typeof product.createdAt === 'string' &&
    typeof product.updatedAt === 'string'
  );
};

/**
 * Validador de parámetros de paginación
 */
export const isValidPaginationParams = (
  params: any,
): params is PaginationParams => {
  return (
    params &&
    typeof params.page === 'number' &&
    typeof params.limit === 'number' &&
    params.page >= PAGINATION_CONSTANTS.MIN_PAGE &&
    params.limit >= PAGINATION_CONSTANTS.MIN_LIMIT &&
    params.limit <= PAGINATION_CONSTANTS.MAX_LIMIT
  );
};

// ================================
// TIPOS DE CONSTANTES DE ORDENAMIENTO
// ================================

/**
 * Constantes para ordenamiento
 */
export const SORTING_CONSTANTS = {
  DEFAULT_FIELD: 'name' as SortField,
  DEFAULT_ORDER: 'asc' as SortOrder,
  FIELDS: {
    NAME: 'name',
    PRICE: 'price',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  } as const,
  DIRECTIONS: {
    ASC: 1,
    DESC: -1,
  } as const,
} as const;

/**
 * Constantes para búsqueda
 */
export const SEARCH_CONSTANTS = {
  OPTIONS: 'i', // Case insensitive
  MIN_LENGTH: 2,
  MAX_LENGTH: 100,
} as const;
