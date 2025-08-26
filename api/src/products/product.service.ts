import { Product, IProduct } from './product.model';
import { PaginatedResult, PaginationOptions } from '../types/pagination';

/**
 * Obtiene productos con paginación
 * @param options - Opciones de paginación
 * @returns Promise<PaginatedResult<IProduct>>
 */
export async function getProducts(
  options: PaginationOptions = {},
): Promise<PaginatedResult<IProduct>> {
  const { page = 1, limit = 10 } = options;

  const currentPage = Math.max(1, Math.floor(page));
  const itemsPerPage = Math.max(1, Math.min(100, Math.floor(limit)));
  const skip = (currentPage - 1) * itemsPerPage;

  const findProductsQuery = Product.find()
    .skip(skip)
    .limit(itemsPerPage)
    .lean();
  const countProductsQuery = Product.countDocuments();
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
