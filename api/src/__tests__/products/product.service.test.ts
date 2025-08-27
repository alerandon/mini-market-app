import * as productService from '../../features/products/product.service';
import { mockProduct, mockProducts, createMockPaginatedResult } from '../mocks';
import { Product } from '../../features/products/product.model';

jest.mock('../../features/products/product.model', () => ({
  Product: {
    countDocuments: jest.fn(),
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn(),
    }),
    findOne: jest.fn(),
    findById: jest.fn(),
  },
}));

describe('Product Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('debería obtener productos con paginación por defecto', async () => {
      (Product.countDocuments as jest.Mock).mockResolvedValue(
        mockProducts.length,
      );

      const mockQuery = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockProducts),
      };
      (Product.find as jest.Mock).mockReturnValue(mockQuery);

      const result = await productService.getProducts({ page: 1, limit: 10 });

      expect(Product.countDocuments).toHaveBeenCalledWith();
      expect(Product.find).toHaveBeenCalledWith();
      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
      expect(mockQuery.lean).toHaveBeenCalled();
      expect(result.data).toEqual(mockProducts);
      expect(result.pagination.currentPage).toBe(1);
      expect(result.pagination.totalItems).toBe(mockProducts.length);
    });

    it('debería respetar los parámetros de paginación', async () => {
      const page2Products = mockProducts.slice(2, 4);

      (Product.countDocuments as jest.Mock).mockResolvedValue(
        mockProducts.length,
      );

      const mockQuery = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(page2Products),
      };
      (Product.find as jest.Mock).mockReturnValue(mockQuery);

      const result = await productService.getProducts({ page: 2, limit: 2 });

      expect(Product.countDocuments).toHaveBeenCalledWith();
      expect(Product.find).toHaveBeenCalledWith();
      expect(mockQuery.skip).toHaveBeenCalledWith(2);
      expect(mockQuery.limit).toHaveBeenCalledWith(2);
      expect(mockQuery.lean).toHaveBeenCalled();
      expect(result.data).toEqual(page2Products);
      expect(result.pagination.currentPage).toBe(2);
    });

    it('debería manejar valores de paginación inválidos', async () => {
      (Product.countDocuments as jest.Mock).mockResolvedValue(
        mockProducts.length,
      );

      const mockQuery = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(mockProducts),
      };
      (Product.find as jest.Mock).mockReturnValue(mockQuery);

      const result = await productService.getProducts({ page: -1, limit: 0 });

      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(mockQuery.limit).toHaveBeenCalledWith(1);
      expect(mockQuery.lean).toHaveBeenCalled();
      expect(result.pagination.currentPage).toBe(1);
    });
  });

  describe('getProductById', () => {
    it('debería obtener un producto por ID válido', async () => {
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productService.getProductById('test-product-123');

      expect(Product.findById).toHaveBeenCalledWith('test-product-123');
      expect(result).toEqual(mockProduct);
    });

    it('debería retornar null para ID inexistente', async () => {
      (Product.findById as jest.Mock).mockResolvedValue(null);

      const result = await productService.getProductById('non-existent-id');

      expect(Product.findById).toHaveBeenCalledWith('non-existent-id');
      expect(result).toBeNull();
    });

    it('debería manejar ID inválido', async () => {
      const error = new Error('ID inválido');
      (Product.findById as jest.Mock).mockRejectedValue(error);

      await expect(productService.getProductById('')).rejects.toThrow(
        'ID inválido',
      );
    });
  });
});
