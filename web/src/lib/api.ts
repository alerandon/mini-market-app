const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Product {
  _id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationResponse<T> {
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

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Obtener todos los productos con paginación
  async getProducts(
    page: number = 1,
    limit: number = 20,
  ): Promise<PaginationResponse<Product>> {
    return this.request<PaginationResponse<Product>>(
      `/products?page=${page}&limit=${limit}`,
    );
  }

  // Obtener un producto por ID
  async getProductById(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  // Buscar productos por término
  async searchProducts(
    query: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<PaginationResponse<Product>> {
    const encodedQuery = encodeURIComponent(query);
    return this.request<PaginationResponse<Product>>(
      `/products/search?q=${encodedQuery}&page=${page}&limit=${limit}`,
    );
  }

  // Filtrar productos por categoría
  async getProductsByCategory(
    category: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<PaginationResponse<Product>> {
    const encodedCategory = encodeURIComponent(category);
    return this.request<PaginationResponse<Product>>(
      `/products?category=${encodedCategory}&page=${page}&limit=${limit}`,
    );
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient(API_BASE_URL);

// Funciones de conveniencia para uso directo
export const getProducts = (page?: number, limit?: number) =>
  apiClient.getProducts(page, limit);
export const getProductById = (id: string) => apiClient.getProductById(id);
export const searchProducts = (query: string, page?: number, limit?: number) =>
  apiClient.searchProducts(query, page, limit);
export const getProductsByCategory = (
  category: string,
  page?: number,
  limit?: number,
) => apiClient.getProductsByCategory(category, page, limit);
