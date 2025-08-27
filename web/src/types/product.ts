// Interfaz principal del producto
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

// Tipos para creación y actualización de productos
export interface CreateProductData {
  name: string;
  price: number;
  isAvailable?: boolean;
  category: string;
  image: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  _id: string;
}

// Validador de producto
export const isValidProduct = (product: any): product is Product => {
  return (
    product &&
    typeof product._id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.isAvailable === 'boolean' &&
    typeof product.category === 'string' &&
    typeof product.image === 'string' &&
    typeof product.createdAt === 'string' &&
    typeof product.updatedAt === 'string'
  );
};

// Tipos para ordenamiento
export type SortField = 'price' | 'name' | 'createdAt' | 'updatedAt';
export type SortOrder = 'asc' | 'desc';

// Categorías de productos
export type ProductCategory =
  | 'electronics'
  | 'home'
  | 'clothing'
  | 'books'
  | 'sports'
  | 'beauty'
  | 'automotive'
  | 'other';
