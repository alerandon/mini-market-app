import { renderHook, waitFor, act } from '@testing-library/react';
import { useProducts } from '../../hooks/useProducts';
import { createMockFetch, createMockFetchError } from '../mocks/utils';
import { mockApiResponse, mockFilters } from '../mocks/products';

// Mock de getProducts
jest.mock('../../lib/api', () => ({
  getProducts: jest.fn(),
}));

import { getProducts } from '../../lib/api';
const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

describe('useProducts', () => {
  beforeEach(() => {
    mockGetProducts.mockClear();
    jest.clearAllMocks();
  });

  it('inicializa con el estado correcto', () => {
    const { result } = renderHook(() => useProducts(mockFilters));

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.totalItems).toBe(0);
    expect(typeof result.current.fetchProducts).toBe('function');
    expect(typeof result.current.refetch).toBe('function');
  });

  it('carga productos exitosamente', async () => {
    mockGetProducts.mockResolvedValue({
      data: mockApiResponse.products,
      pagination: mockApiResponse.pagination,
    });

    const { result } = renderHook(() => useProducts(mockFilters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockApiResponse.products);
    expect(result.current.totalPages).toBe(
      mockApiResponse.pagination.totalPages,
    );
    expect(result.current.totalItems).toBe(
      mockApiResponse.pagination.totalItems,
    );
    expect(result.current.error).toBe(null);
  });

  it('llama a getProducts con los filtros correctos', async () => {
    mockGetProducts.mockResolvedValue({
      data: [],
      pagination: { totalPages: 1, totalItems: 0 },
    });

    const customFilters = {
      page: 2,
      limit: 20,
      search: 'iPhone',
      sort: 'price',
      order: 'desc' as const,
      available: true,
    };

    renderHook(() => useProducts(customFilters));

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledWith(
        customFilters.page,
        customFilters.limit,
        customFilters.search,
        customFilters.sort,
        customFilters.order,
        customFilters.available,
      );
    });
  });

  it('maneja errores de red correctamente', async () => {
    const networkError = new Error('fetch failed');
    mockGetProducts.mockRejectedValue(networkError);

    const { result } = renderHook(() => useProducts(mockFilters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      'Error de red. Verifica que la API esté funcionando.',
    );
    expect(result.current.products).toEqual([]);
  });

  it('maneja errores 404 correctamente', async () => {
    const error404 = new Error('404 Not Found');
    mockGetProducts.mockRejectedValue(error404);

    const { result } = renderHook(() => useProducts(mockFilters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Endpoint no encontrado.');
  });

  it('maneja errores 500 correctamente', async () => {
    const error500 = new Error('500 Internal Server Error');
    mockGetProducts.mockRejectedValue(error500);

    const { result } = renderHook(() => useProducts(mockFilters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Error interno del servidor.');
  });

  it('maneja errores generales', async () => {
    const genericError = new Error('Something went wrong');
    mockGetProducts.mockRejectedValue(genericError);

    const { result } = renderHook(() => useProducts(mockFilters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      'Error de conexión. Por favor, intenta de nuevo.',
    );
  });

  it('refetch funciona correctamente', async () => {
    mockGetProducts.mockResolvedValue({
      data: mockApiResponse.products,
      pagination: mockApiResponse.pagination,
    });

    const { result } = renderHook(() => useProducts(mockFilters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Limpiar el mock para verificar que refetch hace una nueva llamada
    mockGetProducts.mockClear();

    // Ejecutar refetch
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledTimes(1);
    });
  });

  it('fetchProducts funciona correctamente', async () => {
    mockGetProducts.mockResolvedValue({
      data: mockApiResponse.products,
      pagination: mockApiResponse.pagination,
    });

    const { result } = renderHook(() => useProducts(mockFilters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    mockGetProducts.mockClear();

    // Ejecutar fetchProducts directamente
    act(() => {
      result.current.fetchProducts();
    });

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledTimes(1);
    });
  });

  it('vuelve a cargar cuando los filtros cambian', async () => {
    mockGetProducts.mockResolvedValue({
      data: [],
      pagination: { totalPages: 1, totalItems: 0 },
    });

    const { rerender } = renderHook(({ filters }) => useProducts(filters), {
      initialProps: { filters: mockFilters },
    });

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledTimes(1);
    });

    // Cambiar filtros
    const newFilters = { ...mockFilters, search: 'nuevo término' };
    rerender({ filters: newFilters });

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledTimes(2);
    });

    expect(mockGetProducts).toHaveBeenLastCalledWith(
      newFilters.page,
      newFilters.limit,
      newFilters.search,
      newFilters.sort,
      newFilters.order,
      newFilters.available,
    );
  });

  it('limpia errores al hacer una nueva petición exitosa', async () => {
    // Primera llamada falla
    mockGetProducts.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useProducts(mockFilters));

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    // Segunda llamada exitosa
    mockGetProducts.mockResolvedValue({
      data: mockApiResponse.products,
      pagination: mockApiResponse.pagination,
    });

    act(() => {
      result.current.fetchProducts();
    });

    await waitFor(() => {
      expect(result.current.error).toBe(null);
      expect(result.current.products).toEqual(mockApiResponse.products);
    });
  });
});
