'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product, getProducts } from '@/lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  console.log(
    '🔄 ProductsPage renderizando - loading:',
    loading,
    'error:',
    error,
    'products:',
    products.length,
  );

  useEffect(() => {
    console.log('⚡ useEffect ejecutándose - currentPage:', currentPage);
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    try {
      console.log('🔍 Iniciando fetchProducts, página:', page);
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
      setError('Error de conexión. Por favor, intenta de nuevo.');
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
            <p className="text-red-800">{error}</p>
            <button
              onClick={() => fetchProducts(currentPage)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Debug Info */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-bold">🐛 Debug Info:</h2>
        <p>
          <strong>Loading:</strong> {loading ? 'true' : 'false'}
        </p>
        <p>
          <strong>Error:</strong> {error || 'null'}
        </p>
        <p>
          <strong>Products count:</strong> {products.length}
        </p>
        <p>
          <strong>Current page:</strong> {currentPage}
        </p>
        <p>
          <strong>Total pages:</strong> {totalPages}
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Nuestros Productos
        </h1>
        <p className="text-gray-600">
          Descubre nuestra amplia selección de productos
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-max">
          {products.map((product) => (
            <div key={product._id} className="min-w-[250px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
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
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
