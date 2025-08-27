'use client';

import { useState, useEffect } from 'react';

export interface FilterOptions {
  search: string;
  sort: 'price' | 'name';
  order: 'asc' | 'desc';
  available: boolean | undefined;
  page: number;
  limit: number;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isLoading?: boolean;
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  isLoading = false,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Actualizar filtros locales cuando cambien los filtros externos
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSearchChange = (value: string) => {
    const newFilters = { ...localFilters, search: value, page: 1 };
    setLocalFilters(newFilters);

    // Limpiar timeout anterior
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Aplicar búsqueda con debounce de 500ms
    const timeout = setTimeout(() => {
      onFiltersChange(newFilters);
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleSortChange = (sort: 'price' | 'name') => {
    const newFilters = { ...localFilters, sort, page: 1 };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleOrderChange = (order: 'asc' | 'desc') => {
    const newFilters = { ...localFilters, order, page: 1 };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleAvailableChange = (available: boolean | undefined) => {
    const newFilters = { ...localFilters, available, page: 1 };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleLimitChange = (limit: number) => {
    const newFilters = { ...localFilters, limit, page: 1 };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterOptions = {
      search: '',
      sort: 'name',
      order: 'asc',
      available: undefined,
      page: 1,
      limit: 12,
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  // Limpiar timeout al desmontar el componente
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        🔍 Buscar y Filtrar Productos
      </h2>

      {/* Búsqueda */}
      <div className="mb-6">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Buscar por nombre
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={localFilters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Escribe el nombre del producto..."
            disabled={isLoading}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-900 bg-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {localFilters.search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={isLoading}
            >
              <svg
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filtros en grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ordenar por */}
        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ordenar por
          </label>
          <select
            id="sort"
            value={localFilters.sort}
            onChange={(e) =>
              handleSortChange(e.target.value as 'price' | 'name')
            }
            disabled={isLoading}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-900 bg-white"
          >
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
        </div>

        {/* Orden */}
        <div>
          <label
            htmlFor="order"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Orden
          </label>
          <select
            id="order"
            value={localFilters.order}
            onChange={(e) =>
              handleOrderChange(e.target.value as 'asc' | 'desc')
            }
            disabled={isLoading}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-900 bg-white"
          >
            <option value="asc">
              {localFilters.sort === 'price' ? 'Menor a mayor' : 'A - Z'}
            </option>
            <option value="desc">
              {localFilters.sort === 'price' ? 'Mayor a menor' : 'Z - A'}
            </option>
          </select>
        </div>

        {/* Disponibilidad */}
        <div>
          <label
            htmlFor="available"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Disponibilidad
          </label>
          <select
            id="available"
            value={
              localFilters.available === undefined
                ? 'all'
                : localFilters.available.toString()
            }
            onChange={(e) => {
              const value = e.target.value;
              handleAvailableChange(
                value === 'all' ? undefined : value === 'true',
              );
            }}
            disabled={isLoading}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-900 bg-white"
          >
            <option value="all">Todos</option>
            <option value="true">Con stock</option>
            <option value="false">Sin stock</option>
          </select>
        </div>

        {/* Productos por página */}
        <div>
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Por página
          </label>
          <select
            id="limit"
            value={localFilters.limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            disabled={isLoading}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-900 bg-white"
          >
            <option value={5}>5 productos</option>
            <option value={10}>10 productos</option>
          </select>
        </div>
      </div>

      {/* Botón para limpiar filtros */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={clearFilters}
          disabled={isLoading}
          className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          🗑️ Limpiar filtros
        </button>
      </div>

      {/* Indicador de carga */}
      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Cargando productos...</span>
          </div>
        </div>
      )}
    </div>
  );
}
