'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { productService } from '@/services/productService';
import { ProductFilters } from '@/components/organisms/ProductFilters';
import { BackNavigation } from '@/components/molecules/BackNavigation';
import { FilterParams, ProductType, productTypes } from '@/types';
import { Timestamp } from 'firebase/firestore';

// Tipo híbrido para compatibilidad entre ambas interfaces de Product
type ProductHybrid = {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  images?: string[];
  stock?: number;
  inStock?: boolean;
  type?: string;
  sizes?: string[];
  featured?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.categoria as string;
  
  // Debug: Log para ver qué categoría se está recibiendo
  console.log('Categoria recibida (original):', params.categoria);
  console.log('Categoria decodificada:', decodeURIComponent(category || ''));
  console.log('Categoria bytes:', Array.from(category).map(c => c.charCodeAt(0)));
  console.log('Comparación directa con "niño":', category === 'niño');
  console.log('Comparación decodificada:', decodeURIComponent(category) === 'niño');
  
  const [products, setProducts] = useState<ProductHybrid[]>([]);
  const [allProducts, setAllProducts] = useState<ProductHybrid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const decodedCategory = decodeURIComponent(category || '');
        console.log('Cargando productos para categoría:', decodedCategory);
        
        const allProductsData = await productService.getAllProducts();
        console.log('📦 Productos cargados desde Firebase:', allProductsData);
        
        // Convertir a ProductHybrid y filtrar por categoría
        const convertedProducts = allProductsData
          .filter(product => product.id) // Solo productos con ID válido
          .map(product => ({
            ...product,
            id: product.id!,
            imageUrl: product.imageUrl || '',
            stock: product.stock ?? 0,
            featured: product.featured ?? false
          } as ProductHybrid));
        
        setAllProducts(convertedProducts);
        setProducts(convertedProducts);
      } catch (error) {
        console.error('Error cargando productos:', error);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      loadProducts();
    }
  }, [category]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    console.log('🔍 Iniciando filtrado...');
    console.log('📦 Todos los productos:', allProducts);
    console.log('🏷️ Categoría a filtrar:', category);
    
    let filtered = [...allProducts];

    // Filtrar por categoría primero
    if (category) {
      console.log('🎯 Filtrando por categoría:', category);
      const decodedCategory = decodeURIComponent(category);
      console.log('🎯 Categoría decodificada:', decodedCategory);
      filtered = filtered.filter(product => {
        console.log(`Producto: ${product.name}, Categoría: "${product.category}", Coincide: ${product.category === decodedCategory}`);
        return product.category === decodedCategory;
      });
      console.log('📊 Productos después del filtro de categoría:', filtered);
    }

    // Filtrar por tipo si está seleccionado
    if (filters.type) {
      console.log('🔖 Filtrando por tipo:', filters.type);
      filtered = filtered.filter(product => {
        // Buscar el tipo tanto por slug como por nombre
        const typeMatch = product.type === filters.type || 
                         productTypes.find(pt => pt.slug === filters.type)?.name === product.type ||
                         productTypes.find(pt => pt.id === filters.type)?.slug === product.type;
        console.log(`Producto: ${product.name}, Tipo: "${product.type}", Filtro: "${filters.type}", Coincide: ${typeMatch}`);
        return typeMatch;
      });
    }

    // Filtrar por tallas si hay alguna seleccionada
    if (filters.sizes && filters.sizes.length > 0) {
      console.log('📏 Filtrando por tallas:', filters.sizes);
      filtered = filtered.filter(product => {
        // Para productos del servicio actual que usan "stock" en lugar de "sizes"
        if (product.sizes) {
          return product.sizes.some((size: string) => filters.sizes?.includes(size));
        }
        return false;
      });
    }

    // Filtrar por stock - usar tanto stock como inStock para compatibilidad
    if (filters.inStock) {
      console.log('📦 Filtrando por stock');
      filtered = filtered.filter(product => {
        // Si tiene la propiedad stock (nuevo formato)
        if (product.stock !== undefined) {
          return product.stock > 0;
        }
        // Si tiene la propiedad inStock (formato original)
        if (product.inStock !== undefined) {
          return product.inStock;
        }
        return false;
      });
    }

    console.log('✅ Productos finales:', filtered);
    setProducts(filtered);
  }, [filters, allProducts, category]);

  const handleFiltersChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const getCategoryTitle = (cat: string) => {
    console.log('📝 getCategoryTitle llamada con:', cat);
    const decodedCat = decodeURIComponent(cat);
    console.log('📝 getCategoryTitle decodificada:', decodedCat);
    
    switch (decodedCat) {
      case 'niño':
        return 'Ropa para Niño';
      case 'hombre':
        return 'Ropa para Hombre';
      case 'mujer':
        return 'Ropa para Mujer';
      default:
        return decodedCat.charAt(0).toUpperCase() + decodedCat.slice(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <BackNavigation
            backUrl="/"
            backLabel="Volver al inicio"
            showHome={false}
          />
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando productos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <BackNavigation
            backUrl="/"
            backLabel="Volver al inicio"
            showHome={false}
          />
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Error</h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categoryTitle = getCategoryTitle(decodeURIComponent(category || ''));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BackNavigation
          backUrl="/"
          backLabel="Volver al inicio"
          showHome={false}
        />

        <div className="mt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              {categoryTitle}
            </h1>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          </div>

          {/* Layout con filtros y productos */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtros laterales */}
            <aside className="lg:w-80 lg:flex-shrink-0">
              <ProductFilters
                productTypes={productTypes.filter((type: ProductType) => {
                  const decodedCategory = decodeURIComponent(params.categoria as string);
                  console.log('🔍 Filtrando tipos para categoría:', decodedCategory);
                  console.log('🔍 Tipo:', type.name, 'Categoría del tipo:', type.category);
                  return type.category === decodedCategory;
                })}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </aside>

            {/* Grid de productos */}
            <main className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/producto/${product.id}`}
                    className="bg-card rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow duration-200"
                  >
                    {product.imageUrl && product.imageUrl.trim() !== '' && (
                      <div className="aspect-square overflow-hidden relative">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {getCategoryTitle(product.category)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          (product.stock !== undefined ? product.stock > 0 : product.inStock)
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {(product.stock !== undefined ? product.stock > 0 : product.inStock) ? 'En stock' : 'Agotado'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-lg font-semibold mb-2">No hay productos disponibles</h3>
                  <p className="text-muted-foreground">
                    {allProducts.length > 0 
                      ? 'Intenta ajustar los filtros para ver más productos.'
                      : 'No se encontraron productos en esta categoría por el momento.'
                    }
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}