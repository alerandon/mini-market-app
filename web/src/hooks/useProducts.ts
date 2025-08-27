import { useState, useEffect, useCallback } from 'react';
import { Product, getProducts } from '@/lib/api';
import { ProductFilterOptions } from '@mini-market/shared';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
  fetchProducts: () => void;
  refetch: () => void;
}

export function useProducts(filters: ProductFilterOptions): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Asegurar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Mapear SortField a los valores permitidos por la API
      const apiSortField =
        filters.sort === 'createdAt' || filters.sort === 'updatedAt'
          ? 'name'
          : filters.sort;

      const response = await getProducts(
        filters.page,
        filters.limit,
        filters.search,
        apiSortField,
        filters.order,
        filters.available,
      );

      setProducts(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalItems(response.pagination.totalItems);
    } catch (err) {
      console.error('❌ Error en fetchProducts:', err);

      // Determinar tipo de error
      let errorMessage = 'Error de conexión. Por favor, intenta de nuevo.';
      if (err instanceof Error) {
        console.error('❌ Error message:', err.message);
        if (err.message.includes('fetch')) {
          errorMessage = 'Error de red. Verifica que la API esté funcionando.';
        } else if (err.message.includes('404')) {
          errorMessage = 'Endpoint no encontrado.';
        } else if (err.message.includes('500')) {
          errorMessage = 'Error interno del servidor.';
        }
      }

      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // Asegurar que estamos en el cliente antes de hacer la llamada
    if (isClient && typeof window !== 'undefined') {
      fetchProducts();
    }
  }, [filters, isClient, fetchProducts]);

  return {
    products,
    loading,
    error,
    totalPages,
    totalItems,
    fetchProducts,
    refetch: fetchProducts,
  };
}
