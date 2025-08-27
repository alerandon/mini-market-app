import { FilterOptions } from '@/types';

interface UsePaginationResult {
  handlePageChange: (page: number) => void;
  handleFiltersChange: (newFilters: FilterOptions) => void;
}

interface UsePaginationProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export function usePagination({
  filters,
  setFilters,
}: UsePaginationProps): UsePaginationResult {
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    handlePageChange,
    handleFiltersChange,
  };
}
