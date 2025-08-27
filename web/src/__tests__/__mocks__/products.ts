// @jest-environment node
// Este archivo contiene mocks de datos para testing
import { Product } from '@mini-market/shared';

export const mockProduct: Product = {
  _id: '507f1f77bcf86cd799439011',
  name: 'iPhone 14 Pro',
  price: 999.99,
  category: 'electronics',
  image: '/images/iphone-14-pro.jpg',
  isAvailable: true,
  createdAt: '2024-01-15T08:30:00.000Z',
  updatedAt: '2024-01-15T08:30:00.000Z',
};

export const mockProducts: Product[] = [
  mockProduct,
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Samsung Galaxy S23',
    price: 799.99,
    category: 'electronics',
    image: '/images/samsung-s23.jpg',
    isAvailable: true,
    createdAt: '2024-01-15T09:30:00.000Z',
    updatedAt: '2024-01-15T09:30:00.000Z',
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'MacBook Air M2',
    price: 1199.99,
    category: 'electronics',
    image: '/images/macbook-air-m2.jpg',
    isAvailable: false,
    createdAt: '2024-01-15T10:30:00.000Z',
    updatedAt: '2024-01-15T10:30:00.000Z',
  },
];

export const mockApiResponse = {
  products: mockProducts,
  pagination: {
    currentPage: 1,
    totalPages: 3,
    totalItems: 25,
    itemsPerPage: 10,
    hasNextPage: true,
    hasPreviousPage: false,
  },
};

export const mockFilters = {
  page: 1,
  limit: 10,
  search: '',
  category: '',
  minPrice: 0,
  maxPrice: 1000,
  sortBy: 'name',
  sortOrder: 'asc' as const,
};
