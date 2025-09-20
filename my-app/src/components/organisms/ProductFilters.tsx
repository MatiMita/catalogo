import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FilterParams, ProductType } from "@/types";
import { Filter, X } from "lucide-react";

interface ProductFiltersProps {
  productTypes: ProductType[];
  filters: FilterParams;
  onFiltersChange: (filters: FilterParams) => void;
  onClearFilters: () => void;
}

const adultSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const childSizes = ["2", "4", "6", "8", "10", "12", "14", "16"];

export function ProductFilters({
  productTypes,
  filters,
  onFiltersChange,
  onClearFilters
}: ProductFiltersProps) {
  // Determinar qué tallas mostrar basado en la categoría
  const isChildCategory = productTypes.some(type => type.category === 'niño');
  const sizes = isChildCategory ? childSizes : adultSizes;
  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, type });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { type: _removedType, ...newFilters } = filters;
      onFiltersChange(newFilters);
    }
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const currentSizes = filters.sizes || [];
    let newSizes: string[];
    
    if (checked) {
      newSizes = [...currentSizes, size];
    } else {
      newSizes = currentSizes.filter(s => s !== size);
    }
    
    onFiltersChange({ 
      ...filters, 
      sizes: newSizes.length > 0 ? newSizes : undefined 
    });
  };

  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({ 
      ...filters, 
      inStock: checked ? true : undefined 
    });
  };

  const hasActiveFilters = filters.type || filters.sizes?.length || filters.inStock;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter size={20} />
            Filtros
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={16} className="mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tipo de Producto */}
        <div>
          <h3 className="font-medium mb-3">Tipo de Producto</h3>
          <div className="space-y-2">
            {productTypes.map((productType) => (
              <div key={productType.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${productType.id}`}
                  checked={filters.type === productType.slug}
                  onCheckedChange={(checked) => 
                    handleTypeChange(productType.slug, checked as boolean)
                  }
                />
                <label
                  htmlFor={`type-${productType.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {productType.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tallas */}
        <div>
          <h3 className="font-medium mb-3">Tallas</h3>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.sizes?.includes(size) || false}
                  onCheckedChange={(checked) => 
                    handleSizeChange(size, checked as boolean)
                  }
                />
                <label
                  htmlFor={`size-${size}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Disponibilidad */}
        <div>
          <h3 className="font-medium mb-3">Disponibilidad</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock || false}
              onCheckedChange={handleInStockChange}
            />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Solo productos disponibles
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}