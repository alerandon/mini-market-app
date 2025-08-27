'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product, getProductById } from '@/lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const productId = params.id as string;

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const product = await getProductById(id);
      setProduct(product);
    } catch (err) {
      setError('Error al cargar el producto. Por favor, intenta de nuevo.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    // Aquí podrías agregar la lógica real para manejar favoritos
    // Por ahora solo cambiamos el estado visual
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md mx-auto">
            <p className="text-red-800 mb-4">{error}</p>
            <div className="space-x-4">
              <button
                onClick={handleGoBack}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={() => fetchProduct(productId)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botón de volver */}
      <button
        onClick={handleGoBack}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver a productos
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Imagen del producto */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-lg"
                priority
              />

              {/* Badge de stock */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    product.isAvailable
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {product.isAvailable ? 'En stock' : 'Sin stock'}
                </span>
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                {product.category}
              </span>

              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-3xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Información adicional */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">
                    Disponibilidad:
                  </span>
                  <p
                    className={`mt-1 ${product.isAvailable ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {product.isAvailable ? 'Disponible' : 'No disponible'}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Categoría:</span>
                  <p className="mt-1 text-gray-600">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Botón de agregar a favoritos */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={handleAddToFavorites}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isFavorite
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <svg
                  className={`w-5 h-5 ${isFavorite ? 'fill-current' : 'stroke-current fill-none'}`}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>
                  {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </span>
              </button>
            </div>

            {/* Información de fechas */}
            <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
              <p>
                Creado:{' '}
                {new Date(product.createdAt).toLocaleDateString('es-ES')}
              </p>
              <p>
                Actualizado:{' '}
                {new Date(product.updatedAt).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
