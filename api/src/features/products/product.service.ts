import { Product, IProduct } from './product.model';
import { PAGINATION, SORTING } from './product.constants';
import {
  PaginatedResponse,
  ApiProductFilterOptions,
} from '@mini-market/shared';
import {
  buildProductQuery,
  buildProductFilter,
  buildProductSort,
} from './product.helpers';

/**
 * Obtiene productos con paginación, búsqueda, filtros y ordenamiento
 * @param options - Opciones de paginación, búsqueda, filtros y ordenamiento
 * @returns Promise<PaginatedResponse<IProduct>>
 */
export async function getProducts(
  options: ApiProductFilterOptions = {},
): Promise<PaginatedResponse<IProduct>> {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_LIMIT,
    search,
    sort = SORTING.DEFAULT_FIELD,
    order = SORTING.DEFAULT_ORDER,
    available,
  } = options;

  const currentPage = Math.max(PAGINATION.MIN_PAGE, Math.floor(page));
  const itemsPerPage = Math.max(
    PAGINATION.MIN_LIMIT,
    Math.min(PAGINATION.MAX_LIMIT, Math.floor(limit)),
  );
  const skip = (currentPage - 1) * itemsPerPage;

  // Construir filtro y opciones de ordenamiento
  const filter = buildProductFilter({ search, available });
  const sortOptions = buildProductSort({ sort, order });
  const findProductsQuery = buildProductQuery({
    filter,
    sortOptions,
    skip,
    itemsPerPage,
  });

  const countProductsQuery = Product.countDocuments(filter);

  const [products, totalItems] = await Promise.all([
    findProductsQuery,
    countProductsQuery,
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const response: PaginatedResponse<IProduct> = {
    data: products,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    },
  };

  return response;
}

/**
 * Obtiene un producto por su ID de MongoDB
 * @param productId - ID único del producto (ObjectId de MongoDB)
 * @returns Promise<IProduct | null>
 * @throws Error cuando el ID es inválido
 */
export async function getProductById(
  productId: string,
): Promise<IProduct | null> {
  const notValidID = !productId || productId.trim() === '';
  if (notValidID) throw new Error('ID inválido');

  const product = await Product.findById(productId).catch(() => null);
  return product;
}
