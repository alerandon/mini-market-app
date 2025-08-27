const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

console.log('🔧 API_BASE_URL configurada:', API_BASE_URL);
console.log(
  '🔧 process.env.NEXT_PUBLIC_API_URL:',
  process.env.NEXT_PUBLIC_API_URL,
);

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
    console.log('🔧 ApiClient creado con baseUrl:', baseUrl);
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('📡 Llamando a:', url);
    console.log(
      '🌐 Entorno:',
      typeof window !== 'undefined' ? 'cliente' : 'servidor',
    );

    try {
      // Verificar si estamos en el cliente
      if (typeof window === 'undefined') {
        console.warn('⚠️ Request ejecutándose en el servidor (SSR)');
      }

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        cache: 'no-store', // Evitar problemas de caché en Next.js
        ...options,
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const data = await response.json();
      console.log('✅ Data recibida:', data);
      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        url,
        endpoint,
      });
      throw error;
    }
  }

  // Obtener todos los productos con paginación, búsqueda, filtros y ordenamiento
  async getProducts(
    page: number = 1,
    limit: number = 20,
    search?: string,
    sort?: 'price' | 'name',
    order?: 'asc' | 'desc',
    available?: boolean,
  ): Promise<PaginationResponse<Product>> {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());

    if (search && search.trim()) {
      params.set('search', search.trim());
    }
    if (sort) {
      params.set('sort', sort);
    }
    if (order) {
      params.set('order', order);
    }
    if (available !== undefined) {
      params.set('available', available.toString());
    }

    return this.request<PaginationResponse<Product>>(
      `/products?${params.toString()}`,
    );
  }

  // Obtener un producto por ID
  async getProductById(id: string): Promise<Product> {
    const response = await this.request<{ data: Product }>(`/products/${id}`);
    return response.data;
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
export const getProducts = (
  page?: number,
  limit?: number,
  search?: string,
  sort?: 'price' | 'name',
  order?: 'asc' | 'desc',
  available?: boolean,
) => apiClient.getProducts(page, limit, search, sort, order, available);
export const getProductById = (id: string) => apiClient.getProductById(id);
export const searchProducts = (query: string, page?: number, limit?: number) =>
  apiClient.searchProducts(query, page, limit);
export const getProductsByCategory = (
  category: string,
  page?: number,
  limit?: number,
) => apiClient.getProductsByCategory(category, page, limit);
