'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product, getProducts } from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isClient, setIsClient] = useState(false);

  // Asegurar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log(
    '🔄 ProductsPage renderizando - loading:',
    loading,
    'error:',
    error,
    'products:',
    products.length,
    'isClient:',
    isClient,
  );

  useEffect(() => {
    console.log('⚡ useEffect ejecutándose - currentPage:', currentPage);
    console.log('🌐 Window disponible:', typeof window !== 'undefined');
    console.log('🌐 isClient:', isClient);

    // Asegurar que estamos en el cliente antes de hacer la llamada
    if (isClient && typeof window !== 'undefined') {
      fetchProducts(currentPage);
    }
  }, [currentPage, isClient]);

  const fetchProducts = async (page: number) => {
    try {
      console.log('🔍 Iniciando fetchProducts, página:', page);
      console.log(
        '🌐 Verificando entorno:',
        typeof window !== 'undefined' ? 'cliente' : 'servidor',
      );

      setLoading(true);
      setError(null);

      console.log('📡 Llamando a getProducts...');
      const response = await getProducts(page, 12); // 12 productos por página
      console.log('✅ Respuesta recibida:', response);

      setProducts(response.data);
      setTotalPages(response.pagination.totalPages);
      console.log(
        '🎯 Estado actualizado - productos:',
        response.data.length,
        'páginas:',
        response.pagination.totalPages,
      );
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
      console.log('🏁 fetchProducts terminado');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-64">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-center">Cargando...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-64">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-center">
                Cargando productos...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
              <button
                onClick={() => fetchProducts(currentPage)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🛒 Nuestros Productos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre nuestra amplia selección de productos de alta calidad.
            Encuentra exactamente lo que necesitas entre nuestras categorías.
          </p>

          {/* Navigation back to home */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white p-12 rounded-lg shadow-lg max-w-md mx-auto">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                No hay productos disponibles
              </h3>
              <p className="text-gray-600 mb-6">
                Lo sentimos, no encontramos productos en este momento. Intenta
                nuevamente más tarde.
              </p>
              <button
                onClick={() => fetchProducts(currentPage)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Actualizar
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-max">
            {products.map((product) => (
              <div key={product._id} className="min-w-[250px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
