'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/types';
import { productService } from '@/services/database';
import { ProductImageGallery } from '@/components/molecules/ProductImageGallery';
import { SizeSelector } from '@/components/molecules/SizeSelector';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { BackNavigation } from '@/components/molecules/BackNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const productData = await productService.getProductById(productId);
        
        if (productData) {
          setProduct(productData);
          
          // Cargar productos relacionados
          const related = await productService.getRelatedProducts(
            productData.type,
            productData.id,
            4
          );
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error cargando producto:', error);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-muted-foreground mb-6">
            El producto que buscas no existe o ha sido removido.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb mejorado */}
      <BackNavigation
        backUrl={`/categoria/${product.category}`}
        backLabel={product.category === 'niño' ? 'Ropa para Niño' : 'Ropa para Hombre'}
        additionalLinks={[
          { href: '/productos', label: 'Ver todos' }
        ]}
      />

      {/* Producto principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Galería de imágenes */}
        <div>
          <ProductImageGallery 
            images={product.images} 
            productName={product.name} 
          />
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.type}</Badge>
              {product.featured && (
                <Badge variant="default">Destacado</Badge>
              )}
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {product.inStock ? "Disponible" : "Agotado"}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold mb-3">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Selector de tallas */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Tallas Disponibles</h3>
            <SizeSelector 
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />
          </div>

          <Separator />

          {/* Información adicional */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Información del Producto</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Material de alta calidad</p>
              <p>• Fácil cuidado y mantenimiento</p>
              <p>• Diseño moderno y versátil</p>
              <p>• Disponible en múltiples tallas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}