export interface ProductPaginationOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: 'price' | 'name';
  order?: 'asc' | 'desc';
  available?: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
