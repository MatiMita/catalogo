'use client';

import { useEffect, useState } from 'react';
import { Product, ProductType, FilterParams } from '@/types';
import { productService, productTypeService } from '@/services/database';
import { ProductFilters } from '@/components/organisms/ProductFilters';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { BackNavigation } from '@/components/molecules/BackNavigation';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | undefined>();
  const [filters, setFilters] = useState<FilterParams>({});

  // Cargar tipos de productos (todos)
  useEffect(() => {
    async function loadProductTypes() {
      try {
        const allTypes: ProductType[] = [];
        
        // Cargar tipos para niños
        const childTypes = await productTypeService.getProductTypes('niño');
        allTypes.push(...childTypes);
        
        // Cargar tipos para hombres
        const menTypes = await productTypeService.getProductTypes('hombre');
        allTypes.push(...menTypes);
        
        setProductTypes(allTypes);
      } catch (error) {
        console.error('Error cargando tipos de productos:', error);
      }
    }

    loadProductTypes();
  }, []);

  // Cargar productos
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const result = await productService.getProducts(
          filters,
          { page: 1, limit: 12 }
        );
        
        setProducts(result.products);
        setHasMore(result.hasMore);
        setLastDoc(result.lastDoc);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [filters]);

  // Cargar más productos
  const loadMoreProducts = async () => {
    if (!hasMore || loading || !lastDoc) return;

    try {
      setLoading(true);
      const result = await productService.getProducts(
        filters,
        { page: 1, limit: 6 },
        lastDoc
      );
      
      setProducts(prev => [...prev, ...result.products]);
      setHasMore(result.hasMore);
      setLastDoc(result.lastDoc);
    } catch (error) {
      console.error('Error cargando más productos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios de filtros
  const handleFiltersChange = (newFilters: FilterParams) => {
    setFilters(newFilters);
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <BackNavigation
          backUrl="/"
          backLabel="Volver al inicio"
          additionalLinks={[
            { href: '/categoria/niño', label: 'Ropa para Niño' },
            { href: '/categoria/hombre', label: 'Ropa para Hombre' }
          ]}
        />
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Todos los Productos
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Explora nuestra colección completa de ropa para niños y hombres. 
          Encuentra la prenda perfecta navegando por categorías o usando nuestros filtros.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <ProductFilters
              productTypes={productTypes}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          <ProductGrid
            products={products}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMoreProducts}
          />
        </main>
      </div>
    </div>
  );
}