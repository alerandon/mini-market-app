import { render, screen } from '@testing-library/react';
import ProductsPage from '../../app/products/page';
import { useProducts, usePagination } from '../../hooks';
import { Product } from '../../types';

// Mock de todos los hooks personalizados
jest.mock('../../hooks', () => ({
  useProducts: jest.fn(),
  usePagination: jest.fn(),
}));

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;
const mockUsePagination = usePagination as jest.MockedFunction<
  typeof usePagination
>;

const mockProducts: Product[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'iPhone 14 Pro',
    price: 999,
    isAvailable: true,
    category: 'electronics',
    image: '/images/iphone14pro.jpg',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Samsung Galaxy S23',
    price: 899,
    isAvailable: true,
    category: 'electronics',
    image: '/images/galaxy-s23.jpg',
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'MacBook Air M2',
    price: 1299,
    isAvailable: true,
    category: 'electronics',
    image: '/images/macbook-air-m2.jpg',
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
  },
];

describe('ProductsPage', () => {
  const defaultProductsReturn = {
    products: mockProducts,
    loading: false,
    error: null,
    totalPages: 3,
    totalItems: 25,
    fetchProducts: jest.fn(),
    refetch: jest.fn(),
  };

  const defaultPaginationReturn = {
    handlePageChange: jest.fn(),
    handleFiltersChange: jest.fn(),
  };

  beforeEach(() => {
    mockUseProducts.mockReturnValue(defaultProductsReturn);
    mockUsePagination.mockReturnValue(defaultPaginationReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el spinner de carga cuando loading es true', () => {
    mockUseProducts.mockReturnValue({
      ...defaultProductsReturn,
      loading: true,
    });

    render(<ProductsPage />);

    expect(screen.getByText('Cargando productos...')).toBeInTheDocument();
  });

  it('muestra el error cuando hay un error', () => {
    const errorMessage = 'Error al cargar productos';
    mockUseProducts.mockReturnValue({
      ...defaultProductsReturn,
      loading: false,
      error: errorMessage,
    });

    render(<ProductsPage />);

    expect(screen.getByText('Ups, algo salió mal')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Reintentar')).toBeInTheDocument();
  });

  it('muestra el estado vacío cuando no hay productos', () => {
    mockUseProducts.mockReturnValue({
      ...defaultProductsReturn,
      products: [],
      totalItems: 0,
    });

    render(<ProductsPage />);

    expect(
      screen.getByText('No hay productos disponibles'),
    ).toBeInTheDocument();
  });

  it('renderiza la grilla de productos cuando hay productos disponibles', () => {
    render(<ProductsPage />);

    // Verificar que los productos se renderizan
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
