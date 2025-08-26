import { Request, Response } from 'express';
import * as productService from './product.service';
import { handleErrorResponse } from '../utils/error';

/**
 * Obtiene productos con paginación
 * GET /products?page=1&limit=10
 */
export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const result = await productService.getProducts({ page, limit });
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
