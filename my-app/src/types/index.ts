export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'niño' | 'hombre';
  type: string; // camisa, pantalon, zapatos, etc.
  sizes: string[]; // XS, S, M, L, XL, XXL
  images: string[]; // URLs de Cloudinary
  featured: boolean;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  category: string; // referencia a la categoría
  description: string;
}

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams {
  category?: string;
  type?: string;
  sizes?: string[];
  inStock?: boolean;
}

// Datos ficticios de tipos de productos para el filtro
export const productTypes: ProductType[] = [
  { id: '1', name: 'Camisetas', slug: 'camisetas', category: 'niño', description: 'Camisetas para niños' },
  { id: '2', name: 'Pantalones', slug: 'pantalones', category: 'niño', description: 'Pantalones para niños' },
  { id: '3', name: 'Shorts', slug: 'shorts', category: 'niño', description: 'Shorts para niños' },
  { id: '4', name: 'Sudaderas', slug: 'sudaderas', category: 'niño', description: 'Sudaderas para niños' },
  { id: '5', name: 'Camisas', slug: 'camisas', category: 'hombre', description: 'Camisas para hombres' },
  { id: '6', name: 'Jeans', slug: 'jeans', category: 'hombre', description: 'Jeans para hombres' },
  { id: '7', name: 'Chaquetas', slug: 'chaquetas', category: 'hombre', description: 'Chaquetas para hombres' },
  { id: '8', name: 'Polos', slug: 'polos', category: 'hombre', description: 'Polos para hombres' },
  { id: '9', name: 'Bermudas', slug: 'bermudas', category: 'hombre', description: 'Bermudas para hombres' },
  { id: '10', name: 'Trajes', slug: 'trajes', category: 'hombre', description: 'Trajes para hombres' }
];