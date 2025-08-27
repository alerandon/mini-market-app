'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product, getProductById } from '@/lib/api';

// Función helper para validar si un producto tiene todos los campos necesarios
const isValidProduct = (product: any): product is Product => {
  return (
    product &&
    typeof product._id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.isAvailable === 'boolean' &&
    typeof product.category === 'string' &&
    typeof product.image === 'string' &&
    typeof product.createdAt === 'string' &&
    typeof product.updatedAt === 'string'
  );
};

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-64">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-center">
                Cargando producto...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ups, algo salió mal
              </h2>
              <p className="text-red-600 mb-6">{error}</p>
              <div className="space-x-4">
                <button
                  onClick={handleGoBack}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors shadow-lg"
                >
                  Volver
                </button>
                <button
                  onClick={() => fetchProduct(productId)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Navigation */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
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
            ← Volver a productos
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Imagen del producto */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                  priority
                />

                {/* Badge de stock */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-lg ${
                      product.isAvailable
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    {product.isAvailable ? '✅ En stock' : '❌ Sin stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4 border border-blue-200">
                  📦 {product.category}
                </span>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  {product.name}
                </h1>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-4xl font-bold text-green-600 mb-2">
                  {product.price !== undefined && product.price !== null
                    ? `$${product.price.toFixed(2)}`
                    : 'Precio no disponible'}
                </p>
                <p className="text-gray-500 text-sm">
                  Precio incluye impuestos
                </p>
              </div>

              {/* Información adicional */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-medium text-gray-700 block text-sm">
                      🚚 Disponibilidad
                    </span>
                    <p
                      className={`mt-1 font-semibold ${
                        product.isAvailable ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {product.isAvailable
                        ? 'Disponible ahora'
                        : 'No disponible'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-medium text-gray-700 block text-sm">
                      🏷️ Categoría
                    </span>
                    <p className="mt-1 text-gray-900 font-semibold">
                      {product.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón de agregar a favoritos */}
              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handleAddToFavorites}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
                    isFavorite
                      ? 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105'
                      : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                  }`}
                >
                  <span>
                    {isFavorite
                      ? '❤️ Quitar de favoritos'
                      : '🤍 Agregar a favoritos'}
                  </span>
                </button>
              </div>

              {/* Información de fechas */}
              <div className="text-xs text-gray-500 border-t border-gray-200 pt-4 bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p>
                    <span className="font-medium">📅 Creado:</span>{' '}
                    {new Date(product.createdAt).toLocaleDateString('es-ES')}
                  </p>
                  <p>
                    <span className="font-medium">🔄 Actualizado:</span>{' '}
                    {new Date(product.updatedAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
