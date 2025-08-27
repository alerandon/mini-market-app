import request from 'supertest';
import express from 'express';
import productRouter from '../../features/products/product.router';
import * as productService from '../../features/products/product.service';
import {
  mockProduct,
  mockProducts,
  createMockPaginatedProductResult,
} from '../mocks';

jest.mock('../../features/products/product.service');
const mockProductService = productService as jest.Mocked<typeof productService>;

const app = express();
app.use(express.json());
app.use('/products', productRouter);

describe('Product Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /products', () => {
    it('debería obtener productos con paginación por defecto', async () => {
      const mockResult = createMockPaginatedProductResult(mockProducts);
      mockProductService.getProducts.mockResolvedValue(mockResult);

      const response = await request(app).get('/products').expect(200);

      expect(mockProductService.getProducts).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(response.body).toEqual(mockResult);
    });

    it('debería respetar parámetros de paginación', async () => {
      const mockResult = createMockPaginatedProductResult(
        mockProducts.slice(0, 2),
        2,
        2,
      );
      mockProductService.getProducts.mockResolvedValue(mockResult);

      const response = await request(app)
        .get('/products?page=2&limit=2')
        .expect(200);

      expect(mockProductService.getProducts).toHaveBeenCalledWith({
        page: 2,
        limit: 2,
      });
      expect(response.body).toEqual(mockResult);
    });

    it('debería manejar página sin resultados', async () => {
      const mockResult = createMockPaginatedProductResult([]);
      mockProductService.getProducts.mockResolvedValue(mockResult);

      const response = await request(app).get('/products?page=99').expect(200);

      expect(mockProductService.getProducts).toHaveBeenCalledWith({
        page: 99,
        limit: 10,
      });
      expect(response.body.data).toEqual([]);
    });

    it('debería manejar errores del servicio', async () => {
      mockProductService.getProducts.mockRejectedValue(
        new Error('Error de base de datos'),
      );

      const response = await request(app).get('/products').expect(500);

      expect(response.body).toEqual({
        success: false,
        message: 'Error interno del servidor',
        error: 'Error de base de datos',
      });
    });
  });

  describe('GET /products/:id', () => {
    it('debería obtener un producto por ID válido', async () => {
      mockProductService.getProductById.mockResolvedValue(mockProduct as any);

      const response = await request(app)
        .get('/products/test-product-123')
        .expect(200);

      expect(mockProductService.getProductById).toHaveBeenCalledWith(
        'test-product-123',
      );
      expect(response.body).toEqual({ data: mockProduct });
    });

    it('debería retornar null para producto inexistente', async () => {
      mockProductService.getProductById.mockResolvedValue(null);

      const response = await request(app)
        .get('/products/non-existent-id')
        .expect(404);

      expect(mockProductService.getProductById).toHaveBeenCalledWith(
        'non-existent-id',
      );
      expect(response.body).toEqual({
        success: false,
        message: 'Recurso no encontrado',
      });
    });

    it('debería manejar errores del servicio', async () => {
      mockProductService.getProductById.mockRejectedValue(
        new Error('ID inválido'),
      );

      const response = await request(app)
        .get('/products/invalid-id')
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: 'Error interno del servidor',
        error: 'ID inválido',
      });
    });
  });
});
