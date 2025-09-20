'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from "@/components/molecules/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from '@/types';
import { productService } from '@/services/database';
import { getOptimizedImageUrl } from '@/services/cloudinary';

export function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const featuredProducts = await productService.getFeaturedProducts(8);
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error cargando productos destacados:', error);
        // Fallback: mostrar productos mock si hay error
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-muted/50" id="productos">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra selección de productos de alta calidad con las mejores ofertas del mercado
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/50" id="productos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de productos de alta calidad con las mejores ofertas del mercado
          </p>
        </div>
        
        {products.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProductCard
                    id={product.id}
                    title={product.name}
                    description={product.description}
                    image={getOptimizedImageUrl(product.images[0], 'productCard')}
                    category={product.type}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay productos destacados disponibles. 
              <br />
              <span className="text-sm">Ejecuta el comando <code>pnpm run init-db</code> para cargar datos de ejemplo.</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}