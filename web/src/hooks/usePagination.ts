import { ProductFilterOptions } from '@mini-market/shared';

interface UsePaginationResult {
  handlePageChange: (page: number) => void;
  handleFiltersChange: (newFilters: ProductFilterOptions) => void;
}

interface UsePaginationProps {
  setFilters: React.Dispatch<React.SetStateAction<ProductFilterOptions>>;
}

export function usePagination({
  setFilters,
}: UsePaginationProps): UsePaginationResult {
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFiltersChange = (newFilters: ProductFilterOptions) => {
    setFilters(newFilters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    handlePageChange,
    handleFiltersChange,
  };
}
