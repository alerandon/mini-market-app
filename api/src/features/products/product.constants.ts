/**
 * Constantes relacionadas con productos
 */

// Constantes para paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MIN_PAGE: 1,
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
} as const;

// Constantes para ordenamiento
export const SORTING = {
  DEFAULT_FIELD: 'name',
  DEFAULT_ORDER: 'asc',
  FIELDS: {
    NAME: 'name',
    PRICE: 'price',
  },
  DIRECTIONS: {
    ASC: 1,
    DESC: -1,
  },
} as const;

// Constantes para búsqueda
export const SEARCH = {
  OPTIONS: 'i', // Case insensitive
} as const;
