'use client';

import { useState } from 'react';
import { useProducts, usePagination } from '@/hooks';
import { LoadingSpinner, ErrorDisplay, EmptyState } from '@/components/ui';
import {
  ProductsHeader,
  ProductFilters,
  ResultsInfo,
  ProductsGrid,
  Pagination,
} from '@/components/products';
import { FilterOptions } from '@/types';

export default function ProductsPage() {
  // Estado para filtros
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    sort: 'name',
    order: 'asc',
    available: undefined,
    page: 1,
    limit: 10,
  });

  // Hooks personalizados
  const { products, loading, error, totalPages, totalItems, refetch } =
    useProducts(filters);
  const { handlePageChange, handleFiltersChange } = usePagination({
    setFilters,
  });

  // Estados de carga y error
  if (loading) {
    return <LoadingSpinner message="Cargando productos..." />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <ProductsHeader />

        {/* Barra de filtros */}
        <ProductFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isLoading={loading}
        />

        {/* Información de resultados */}
        <ResultsInfo
          totalItems={totalItems}
          currentResultsCount={products.length}
          filters={filters}
          loading={loading}
          error={error}
        />

        {/* Products Grid o Empty State */}
        {products.length === 0 ? (
          <EmptyState
            title="No hay productos disponibles"
            description="Lo sentimos, no encontramos productos en este momento. Intenta nuevamente más tarde."
            actionText="Actualizar"
            onAction={refetch}
          />
        ) : (
          <ProductsGrid products={products} />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
