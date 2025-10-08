'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productService } from '@/services/productService';
import { ProductGrid, ProductHybrid } from '@/components/organisms/ProductGrid';
import { BackNavigation } from '@/components/molecules/BackNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<ProductHybrid | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductHybrid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const allProducts = await productService.getAllProducts();
        const productData = allProducts.find(p => p.id === productId);
        
        if (productData) {
          // Debug: Verificar los datos del producto
          console.log('📦 Producto cargado:', productData);
          console.log('📏 Tallas del producto:', productData.sizes);
          
          // Determinar tallas basadas en la categoría si no hay tallas específicas
          let productSizes = productData.sizes || [];
          if (!productSizes.length) {
            // Asignar tallas por defecto según la categoría
            productSizes = productData.category === 'niño' 
              ? ['2', '4', '6', '8', '10', '12'] 
              : ['S', 'M', 'L', 'XL', 'XXL'];
          }
          
          // Convertir a ProductHybrid
          const hybridProduct: ProductHybrid = {
            ...productData,
            id: productData.id!,
            images: productData.imageUrl ? [productData.imageUrl] : [],
            type: productData.type || 'general',
            sizes: productSizes,
            inStock: (productData.stock || 0) > 0
          };
          
          console.log('🔄 Producto convertido:', hybridProduct);
          console.log('📏 Tallas finales:', hybridProduct.sizes);
          
          setProduct(hybridProduct);
          
          // Cargar productos relacionados de la misma categoría
          const related = allProducts
            .filter(p => p.category === productData.category && p.id !== productId)
            .slice(0, 4)
            .map(p => ({
              ...p,
              id: p.id!,
              images: p.imageUrl ? [p.imageUrl] : [],
              type: p.type || 'general',
              sizes: p.sizes || [],
              inStock: (p.stock || 0) > 0
            } as ProductHybrid));
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
        {/* Imagen del producto */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            {product.imageUrl && product.imageUrl.trim() !== '' ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-muted-foreground">Sin imagen</span>
              </div>
            )}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.featured && (
                <Badge variant="default">Destacado</Badge>
              )}
              <Badge variant={(product.stock || 0) > 0 ? "default" : "destructive"}>
                {(product.stock || 0) > 0 ? "Disponible" : "Agotado"}
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
          {product.sizes && product.sizes.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-3">Tallas Disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Badge
                    key={size}
                    variant="outline"
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors border-2"
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-3">Tallas</h3>
              <p className="text-muted-foreground">No hay tallas especificadas para este producto</p>
            </div>
          )}

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">
              Stock disponible: {product.stock || 0}
            </p>
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