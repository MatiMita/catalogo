'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { getOptimizedImageUrl } from '@/services/cloudinary';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Sin imagen</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <Card className="overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={getOptimizedImageUrl(images[selectedImage], 'productDetail')}
            alt={`${productName} - Imagen ${selectedImage + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </Card>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <Card
              key={index}
              className={cn(
                "overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary",
                selectedImage === index && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square relative">
                <Image
                  src={getOptimizedImageUrl(image, 'thumbnail')}
                  alt={`${productName} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}