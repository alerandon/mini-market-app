import { Request, Response } from 'express';
import * as productService from './product.service';
import { handleErrorResponse } from '../../utils/error';
import { ProductPaginationOptions } from '../../types/pagination';

/**
 * Obtiene productos con paginación, búsqueda, filtros y ordenamiento
 * GET /products?search=&sort=price|name&order=asc|desc&page=1&limit=10&available=true|false
 */
export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const search = req.query.search as string;
    const sort = req.query.sort as 'price' | 'name';
    const order = req.query.order as 'asc' | 'desc';
    const available = req.query.available
      ? req.query.available === 'true'
      : undefined;

    const getProductArgs: ProductPaginationOptions = {
      page,
      limit,
      search,
      sort,
      order,
      available,
    };

    const result = await productService.getProducts(getProductArgs);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(handleErrorResponse(error));
  }
}

/**
 * Obtiene un producto por su ID
 * GET /products/:id
 */
export async function getProductById(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json(handleErrorResponse(error));
  }
}
