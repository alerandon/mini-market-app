import { useState, useEffect } from 'react';
import { Product, getProductById } from '@/lib/api';
import { isValidProduct } from '@/types';

interface UseProductDetailResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  isFavorite: boolean;
  toggleFavorite: () => void;
  refetch: () => void;
}

export function useProductDetail(productId: string): UseProductDetailResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const productData = await getProductById(id);

      // Validar que el producto tenga las propiedades necesarias
      if (!isValidProduct(productData)) {
        console.error('Datos de producto inválidos:', productData);
        throw new Error(
          'Los datos del producto están incompletos o son inválidos',
        );
      }

      setProduct(productData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al cargar el producto: ${errorMessage}`);
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aquí podrías agregar la lógica real para manejar favoritos
    // Por ahora solo cambiamos el estado visual
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  return {
    product,
    loading,
    error,
    isFavorite,
    toggleFavorite,
    refetch: () => fetchProduct(productId),
  };
}
