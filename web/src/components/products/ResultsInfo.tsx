import { FilterOptions } from '@/types';

interface ResultsInfoProps {
  totalItems: number;
  currentResultsCount: number;
  filters: FilterOptions;
  loading: boolean;
  error: string | null;
}

export default function ResultsInfo({
  totalItems,
  currentResultsCount,
  filters,
  loading,
  error,
}: ResultsInfoProps) {
  if (loading || error) {
    return null;
  }

  return (
    <div className="mb-6 text-center">
      <p className="text-gray-600">
        {totalItems > 0 ? (
          <>
            Mostrando {currentResultsCount} de {totalItems} productos
            {filters.search && <span> que contienen "{filters.search}"</span>}
            {filters.available !== undefined && (
              <span> ({filters.available ? 'con stock' : 'sin stock'})</span>
            )}
          </>
        ) : (
          'No se encontraron productos'
        )}
      </p>
    </div>
  );
}
