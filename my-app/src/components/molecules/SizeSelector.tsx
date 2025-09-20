'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  onSizeSelect?: (size: string) => void;
  selectedSize?: string;
}

export function SizeSelector({ sizes, onSizeSelect, selectedSize }: SizeSelectorProps) {
  const [internalSelectedSize, setInternalSelectedSize] = useState<string | undefined>(selectedSize);
  
  const currentSelected = selectedSize ?? internalSelectedSize;

  const handleSizeClick = (size: string) => {
    setInternalSelectedSize(size);
    onSizeSelect?.(size);
  };

  if (!sizes || sizes.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No hay tallas disponibles
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Talla</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant="outline"
            size="sm"
            className={cn(
              "h-10 w-12 p-0",
              currentSelected === size && "border-primary bg-primary text-primary-foreground"
            )}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </Button>
        ))}
      </div>
      {currentSelected && (
        <p className="text-sm text-muted-foreground">
          Talla seleccionada: <span className="font-medium">{currentSelected}</span>
        </p>
      )}
    </div>
  );
}