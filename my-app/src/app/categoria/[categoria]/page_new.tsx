'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { productService, Product } from '@/services/productService';
import { BackNavigation } from '@/components/molecules/BackNavigation';

export default function CategoryPage() {
  const params = useParams();
  const category = params.categoria as string;
  
  // Debug: Log para ver qué categoría se está recibiendo
  console.log('Categoria recibida:', category);
  console.log('Categoria decodificada:', decodeURIComponent(category || ''));
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const decodedCategory = decodeURIComponent(category || '');
        console.log('Cargando productos para categoría:', decodedCategory);
        
        const filteredProducts = await productService.getProductsByCategory(decodedCategory);
        console.log('Productos encontrados:', filteredProducts.length);
        
        setProducts(filteredProducts);
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

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'niño':
        return 'Ropa para Niño';
      case 'hombre':
        return 'Ropa para Hombre';
      default:
        return cat.charAt(0).toUpperCase() + cat.slice(1);
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-sm border">
                {product.imageUrl && (
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
                      product.stock > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? 'En stock' : 'Agotado'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-lg font-semibold mb-2">No hay productos disponibles</h3>
              <p className="text-muted-foreground">
                No se encontraron productos en esta categoría por el momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}