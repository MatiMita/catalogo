export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'niño' | 'hombre' | 'mujer';
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
  // Productos para niños (mantenemos los existentes)
  { id: '1', name: 'Camisetas', slug: 'camisetas', category: 'niño', description: 'Camisetas para niños' },
  { id: '2', name: 'Pantalones', slug: 'pantalones', category: 'niño', description: 'Pantalones para niños' },
  { id: '3', name: 'Shorts', slug: 'shorts', category: 'niño', description: 'Shorts para niños' },
  { id: '4', name: 'Sudaderas', slug: 'sudaderas', category: 'niño', description: 'Sudaderas para niños' },
  { id: '20', name: 'Jeans', slug: 'jeans', category: 'niño', description: 'Jeans para niños' },
  { id: '21', name: 'Poleras cuello redondo', slug: 'poleras-cuello-redondo', category: 'niño', description: 'Poleras cuello redondo para niños' },
  { id: '22', name: 'Polos', slug: 'polos', category: 'niño', description: 'Polos para niños' },
  { id: '23', name: 'Chaleco', slug: 'chaleco', category: 'niño', description: 'Chalecos para niños' },
  
  // Productos para hombres (mantenemos los existentes + nuevos)
  { id: '5', name: 'Camisas', slug: 'camisas', category: 'hombre', description: 'Camisas para hombres' },
  { id: '11', name: 'Camisa manga larga', slug: 'camisa-manga-larga', category: 'hombre', description: 'Camisas de manga larga para hombres' },
  { id: '12', name: 'Camisa manga corta', slug: 'camisa-manga-corta', category: 'hombre', description: 'Camisas de manga corta para hombres' },
  { id: '6', name: 'Jeans', slug: 'jeans', category: 'hombre', description: 'Jeans para hombres' },
  { id: '14', name: 'Chalecos', slug: 'chalecos', category: 'hombre', description: 'Chalecos para hombres' },
  { id: '7', name: 'Chaquetas', slug: 'chaquetas', category: 'hombre', description: 'Chaquetas para hombres' },
  { id: '15', name: 'Chamarras', slug: 'chamarras', category: 'hombre', description: 'Chamarras para hombres' },
  { id: '16', name: 'Poleras cuello redondo', slug: 'poleras-cuello-redondo', category: 'hombre', description: 'Poleras de cuello redondo para hombres' },
  { id: '17', name: 'Polo', slug: 'polo', category: 'hombre', description: 'Camisas polo para hombres' },
  { id: '18', name: 'Pantalón de tela vestir', slug: 'pantalon-tela-vestir', category: 'hombre', description: 'Pantalones de tela para vestir' },
  { id: '9', name: 'Bermudas', slug: 'bermudas', category: 'hombre', description: 'Bermudas para hombres' },
  { id: '10', name: 'Trajes', slug: 'trajes', category: 'hombre', description: 'Trajes para hombres' },
  
  // Productos para mujeres
  { id: '19', name: 'Jean', slug: 'jean', category: 'mujer', description: 'Jeans para mujeres' }
];