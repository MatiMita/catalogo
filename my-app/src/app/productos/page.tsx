'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import { ProductGrid, ProductHybrid } from '@/components/organisms/ProductGrid';
import { BackNavigation } from '@/components/molecules/BackNavigation';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductHybrid[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar todos los productos
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const allProductsData = await productService.getAllProducts();
        
        // Convertir a formato híbrido
        const convertedProducts = allProductsData
          .filter(product => product.id)
          .map(product => ({
            ...product,
            id: product.id!
          } as ProductHybrid));
        
        setProducts(convertedProducts);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-purple-50/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <BackNavigation
          backUrl="/"
          backLabel="Volver al inicio"
          showHome={false}
        />

        <div className="mt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4 text-orange-900">
              🎃 Todos los Productos 👻
            </h1>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          </div>

          {/* Grid de productos */}
          <ProductGrid 
            products={products}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}