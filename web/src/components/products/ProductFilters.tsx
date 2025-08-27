'use client';

import { useState, useEffect } from 'react';
import { FilterOptions } from '@/types';
import { SearchIcon, XIcon } from '@/components/ui';

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

  // Actualizar filtros locales cuando cambien los filtros externos
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSearchChange = (value: string) => {
    const newFilters = { ...localFilters, search: value, page: 1 };
    setLocalFilters(newFilters);
  };

  // Función para búsqueda manual inmediata
  const handleManualSearch = () => {
    // Aplicar filtros inmediatamente
    onFiltersChange(localFilters);
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
      limit: 10,
    };

    // Actualizar filtros locales primero
    setLocalFilters(resetFilters);
    // Luego notificar el cambio
    onFiltersChange(resetFilters);
  };

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
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              id="search"
              value={localFilters.search}
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleManualSearch();
                }
              }}
              placeholder="Escribe el nombre del producto..."
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-900 bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" />
            </div>
            {localFilters.search && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={isLoading}
              >
                <XIcon className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <button
            onClick={handleManualSearch}
            disabled={isLoading}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
          >
            <SearchIcon size={16} />
            Buscar
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Escribe y presiona "Buscar" o Enter para buscar productos
        </p>
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
