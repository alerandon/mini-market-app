import { renderHook, act } from '@testing-library/react';
import { usePagination } from '@/hooks/usePagination';

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

describe('usePagination', () => {
  const mockSetFilters = jest.fn();

  beforeEach(() => {
    mockSetFilters.mockClear();
    mockScrollTo.mockClear();
  });

  it('proporciona las funciones handlePageChange y handleFiltersChange', () => {
    const { result } = renderHook(() =>
      usePagination({ setFilters: mockSetFilters }),
    );

    expect(result.current.handlePageChange).toBeDefined();
    expect(result.current.handleFiltersChange).toBeDefined();
    expect(typeof result.current.handlePageChange).toBe('function');
    expect(typeof result.current.handleFiltersChange).toBe('function');
  });

  describe('handlePageChange', () => {
    it('llama a setFilters con la nueva página manteniendo filtros anteriores', () => {
      const { result } = renderHook(() =>
        usePagination({ setFilters: mockSetFilters }),
      );

      act(() => {
        result.current.handlePageChange(3);
      });

      expect(mockSetFilters).toHaveBeenCalledTimes(1);
      expect(mockSetFilters).toHaveBeenCalledWith(expect.any(Function));

      // Simular la función que se pasa a setFilters
      const setFiltersCallback = mockSetFilters.mock.calls[0][0];
      const prevFilters = { page: 1, limit: 10, search: 'test' };
      const updatedFilters = setFiltersCallback(prevFilters);

      expect(updatedFilters).toEqual({ page: 3, limit: 10, search: 'test' });
    });

    it('hace scroll hacia arriba al cambiar de página', () => {
      const { result } = renderHook(() =>
        usePagination({ setFilters: mockSetFilters }),
      );

      act(() => {
        result.current.handlePageChange(2);
      });

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('maneja números de página diferentes correctamente', () => {
      const { result } = renderHook(() =>
        usePagination({ setFilters: mockSetFilters }),
      );

      act(() => {
        result.current.handlePageChange(5);
      });

      const setFiltersCallback = mockSetFilters.mock.calls[0][0];
      const prevFilters = { page: 1, limit: 10 };
      const resultFilters = setFiltersCallback(prevFilters);

      expect(resultFilters).toEqual({ page: 5, limit: 10 });
    });
  });

  describe('handleFiltersChange', () => {
    it('llama a setFilters con los nuevos filtros completos', () => {
      const { result } = renderHook(() =>
        usePagination({ setFilters: mockSetFilters }),
      );

      const newFilters = {
        page: 1,
        limit: 20,
        search: 'nuevo término',
        category: 'electronics',
        minPrice: 100,
        maxPrice: 500,
      };

      act(() => {
        result.current.handleFiltersChange(newFilters);
      });

      expect(mockSetFilters).toHaveBeenCalledWith(newFilters);
    });

    it('hace scroll hacia arriba al cambiar filtros', () => {
      const { result } = renderHook(() =>
        usePagination({ setFilters: mockSetFilters }),
      );

      const newFilters = { page: 1, limit: 10, search: 'test' };

      act(() => {
        result.current.handleFiltersChange(newFilters);
      });

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });

    it('maneja filtros vacíos correctamente', () => {
      const { result } = renderHook(() =>
        usePagination({ setFilters: mockSetFilters }),
      );

      const emptyFilters = { page: 1, limit: 10 };

      act(() => {
        result.current.handleFiltersChange(emptyFilters);
      });

      expect(mockSetFilters).toHaveBeenCalledWith(emptyFilters);
    });

    it('maneja filtros complejos correctamente', () => {
      const { result } = renderHook(() =>
        usePagination({ setFilters: mockSetFilters }),
      );

      const complexFilters = {
        page: 2,
        limit: 25,
        search: 'smartphone',
        category: 'electronics',
        minPrice: 200,
        maxPrice: 1000,
        sortBy: 'price',
        sortOrder: 'asc' as const,
      };

      act(() => {
        result.current.handleFiltersChange(complexFilters);
      });

      expect(mockSetFilters).toHaveBeenCalledWith(complexFilters);
    });
  });

  it('proporciona funciones que funcionan correctamente en re-renders', () => {
    const { result, rerender } = renderHook(() =>
      usePagination({ setFilters: mockSetFilters }),
    );

    // Ejecutar función en el primer render
    act(() => {
      result.current.handlePageChange(2);
    });

    expect(mockSetFilters).toHaveBeenCalledTimes(1);

    rerender();

    // Ejecutar función después del re-render
    act(() => {
      result.current.handlePageChange(3);
    });

    expect(mockSetFilters).toHaveBeenCalledTimes(2);
  });
});
