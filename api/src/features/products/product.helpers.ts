import { Query } from 'mongoose';
import { Product, IProduct } from './product.model';
import { SORTING, SEARCH } from './product.constants';

interface ProductQueryFilters {
  search?: string;
  available?: boolean;
}

interface ProductQuerySort {
  sort?: 'price' | 'name';
  order?: 'asc' | 'desc';
}

interface BuildProductQueryParams {
  filter: any;
  sortOptions: any;
  skip: number;
  itemsPerPage: number;
}

/**
 * Construye el filtro de búsqueda para productos
 * @param filters - Filtros de búsqueda y disponibilidad
 * @returns Objeto de filtro para MongoDB
 */
export function buildProductFilter(filters: ProductQueryFilters): any {
  const filter: any = {};

  if (filters.search && filters.search.trim()) {
    const searchTerm = filters.search.trim();
    filter.name = { $regex: searchTerm, $options: SEARCH.OPTIONS };
  }

  if (filters.available !== undefined) {
    filter.isAvailable = filters.available;
  }

  return filter;
}

/**
 * Construye las opciones de ordenamiento para productos
 * @param sortOptions - Opciones de ordenamiento
 * @returns Objeto de ordenamiento para MongoDB
 */
export function buildProductSort(sortOptions: ProductQuerySort): any {
  const { sort = SORTING.DEFAULT_FIELD, order = SORTING.DEFAULT_ORDER } =
    sortOptions;
  const sortDirection =
    order === 'desc' ? SORTING.DIRECTIONS.DESC : SORTING.DIRECTIONS.ASC;
  const sortField =
    sort === 'price' ? SORTING.FIELDS.PRICE : SORTING.FIELDS.NAME;
  return { [sortField]: sortDirection };
}

/**
 * Genera una query de productos con filtro, ordenamiento y paginación
 * @param filter - Filtro ya construido para MongoDB
 * @param sortOptions - Opciones de ordenamiento
 * @param skip - Número de documentos a saltar
 * @param itemsPerPage - Límite de documentos por página
 * @returns Query configurada de productos
 */
export function buildProductQuery(
  options: BuildProductQueryParams,
): Query<IProduct[], IProduct> {
  const { filter, sortOptions, skip, itemsPerPage } = options;
  return Product.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(itemsPerPage)
    .lean();
}
