'use client';

import { ProductCard } from "@/components/molecules/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { getOptimizedImageUrl } from "@/services/cloudinary";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function ProductGrid({ products, loading, hasMore, onLoadMore }: ProductGridProps) {
  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No se encontraron productos</p>
        <p className="text-muted-foreground text-sm mt-2">
          Intenta ajustar los filtros o busca algo diferente
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            description={product.description}
            image={getOptimizedImageUrl(product.images[0], 'productCard')}
            category={product.type}
          />
        ))}
      </div>

      {/* Botón cargar más */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={onLoadMore}
            disabled={loading}
            variant="outline"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              'Cargar más productos'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}