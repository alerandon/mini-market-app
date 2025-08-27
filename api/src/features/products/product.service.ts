import { Product, IProduct } from './product.model';
import {
  PaginatedResult,
  ProductPaginationOptions,
} from '../../types/pagination';
import {
  buildProductQuery,
  buildProductFilter,
  buildProductSort,
} from './product.helpers';

/**
 * Obtiene productos con paginación, búsqueda, filtros y ordenamiento
 * @param options - Opciones de paginación, búsqueda, filtros y ordenamiento
 * @returns Promise<PaginatedResult<IProduct>>
 */
export async function getProducts(
  options: ProductPaginationOptions = {},
): Promise<PaginatedResult<IProduct>> {
  const {
    page = 1,
    limit = 10,
    search,
    sort = 'name',
    order = 'asc',
    available,
  } = options;

  const currentPage = Math.max(1, Math.floor(page));
  const itemsPerPage = Math.max(1, Math.min(100, Math.floor(limit)));
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
  const response: PaginatedResult<IProduct> = {
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
 */
export async function getProductById(
  productId: string,
): Promise<IProduct | null> {
  const product = await Product.findById(productId);
  return product;
}
