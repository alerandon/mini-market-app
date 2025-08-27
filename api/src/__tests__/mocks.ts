export interface MockProduct {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
}

export const mockProduct: MockProduct = {
  id: 'test-product-123',
  name: 'Test Product',
  price: 29.99,
  isAvailable: true,
  category: 'Electronics',
  image: 'https://example.com/test-image.jpg',
};

export const mockProducts: MockProduct[] = [
  {
    id: 'test-product-1',
    name: 'Product 1',
    price: 19.99,
    isAvailable: true,
    category: 'Category 1',
    image: 'https://example.com/image1.jpg',
  },
  {
    id: 'test-product-2',
    name: 'Product 2',
    price: 39.99,
    isAvailable: false,
    category: 'Category 2',
    image: 'https://example.com/image2.jpg',
  },
  {
    id: 'test-product-3',
    name: 'Product 3',
    price: 49.99,
    isAvailable: true,
    category: 'Category 1',
    image: 'https://example.com/image3.jpg',
  },
];

export const createMockPaginatedResult = <T>(
  data: T[],
  page = 1,
  limit = 10,
): any => ({
  data,
  pagination: {
    currentPage: page,
    totalPages: Math.ceil(data.length / limit),
    totalItems: data.length,
    itemsPerPage: limit,
    hasNext: page < Math.ceil(data.length / limit),
    hasPrev: page > 1,
  },
});
