import { Request, Response } from 'express';
import * as productController from '../../features/products/product.controller';
import * as productService from '../../features/products/product.service';
import { mockProduct, mockProducts, createMockPaginatedResult } from '../mocks';

jest.mock('../../features/products/product.service');
const mockProductService = productService as jest.Mocked<typeof productService>;

describe('Product Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn(() => ({ json: mockJson }));

    mockRequest = {};
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };

    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('debería retornar productos con paginación por defecto', async () => {
      const mockResult = createMockPaginatedResult(mockProducts);
      mockProductService.getProducts.mockResolvedValue(mockResult);

      mockRequest.query = {};

      await productController.getProducts(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockProductService.getProducts).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockResult);
    });

    it('debería usar parámetros de query personalizados', async () => {
      const mockResult = createMockPaginatedResult(
        mockProducts.slice(0, 2),
        2,
        2,
      );
      mockProductService.getProducts.mockResolvedValue(mockResult);

      mockRequest.query = { page: '2', limit: '2' };

      await productController.getProducts(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockProductService.getProducts).toHaveBeenCalledWith({
        page: 2,
        limit: 2,
      });
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockResult);
    });

    it('debería manejar valores de query inválidos', async () => {
      const mockResult = createMockPaginatedResult(mockProducts);
      mockProductService.getProducts.mockResolvedValue(mockResult);

      mockRequest.query = { page: 'invalid', limit: 'invalid' };

      await productController.getProducts(
        mockRequest as Request,
        mockResponse as Response,
      );

      // El controller debería pasar NaN al servicio, el servicio debería manejar esto
      expect(mockProductService.getProducts).toHaveBeenCalledWith({
        page: NaN,
        limit: NaN,
      });
      expect(mockStatus).toHaveBeenCalledWith(200);
    });

    it('debería manejar errores del servicio', async () => {
      const errorMessage = 'Error de base de datos';
      mockProductService.getProducts.mockRejectedValue(new Error(errorMessage));

      mockRequest.query = {};

      await productController.getProducts(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        message: 'Error interno del servidor',
        error: errorMessage,
      });
    });
  });

  describe('getProductById', () => {
    it('debería retornar un producto por ID válido', async () => {
      mockProductService.getProductById.mockResolvedValue(mockProduct as any);

      mockRequest.params = { id: 'test-product-123' };

      await productController.getProductById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockProductService.getProductById).toHaveBeenCalledWith(
        'test-product-123',
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ data: mockProduct });
    });

    it('debería retornar null cuando el producto no existe', async () => {
      mockProductService.getProductById.mockResolvedValue(null);

      mockRequest.params = { id: 'non-existent-id' };

      await productController.getProductById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockProductService.getProductById).toHaveBeenCalledWith(
        'non-existent-id',
      );
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ data: null });
    });

    it('debería manejar errores del servicio', async () => {
      const errorMessage = 'ID inválido';
      mockProductService.getProductById.mockRejectedValue(
        new Error(errorMessage),
      );

      mockRequest.params = { id: 'invalid-id' };

      await productController.getProductById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        message: 'Error interno del servidor',
        error: errorMessage,
      });
    });

    it('debería manejar errores no identificados', async () => {
      mockProductService.getProductById.mockRejectedValue('Error extraño');

      mockRequest.params = { id: 'test-id' };

      await productController.getProductById(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        message: 'Error interno del servidor',
        error: 'Error desconocido',
      });
    });
  });
});
