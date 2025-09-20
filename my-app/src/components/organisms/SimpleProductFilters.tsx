import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";

interface SimpleFilters {
  inStock?: boolean;
  featured?: boolean;
}

interface SimpleProductFiltersProps {
  filters: SimpleFilters;
  onFiltersChange: (filters: SimpleFilters) => void;
  onClearFilters: () => void;
}

export function SimpleProductFilters({
  filters,
  onFiltersChange,
  onClearFilters
}: SimpleProductFiltersProps) {
  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({ 
      ...filters, 
      inStock: checked ? true : undefined 
    });
  };

  const handleFeaturedChange = (checked: boolean) => {
    onFiltersChange({ 
      ...filters, 
      featured: checked ? true : undefined 
    });
  };

  const hasActiveFilters = filters.inStock || filters.featured;

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

        <Separator />

        {/* Productos destacados */}
        <div>
          <h3 className="font-medium mb-3">Destacados</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured || false}
              onCheckedChange={handleFeaturedChange}
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Solo productos destacados
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}