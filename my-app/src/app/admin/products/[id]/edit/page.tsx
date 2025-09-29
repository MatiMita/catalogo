'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BackNavigation } from '@/components/molecules/BackNavigation';
import { AdminGuard } from '@/components/guards/AdminGuard';
import { productService } from '@/services/productService';
import { ImageUpload } from '@/components/ui/image-upload';
import { CATEGORIES } from '@/constants/categories';
import { getSizesForCategory, getProductTypesForCategory } from '@/constants/productTypes';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit } from 'lucide-react';

export default function EditProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    sizes: [] as string[],
    imageUrl: '',
    stock: 1,
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [productNotFound, setProductNotFound] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  // Cargar datos del producto
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const product = await productService.getProduct(productId);
        if (product) {
          setFormData({
            name: product.name,
            description: product.description,
            category: product.category,
            type: product.type || '',
            sizes: product.sizes || [],
            imageUrl: product.imageUrl || '',
            stock: product.stock,
            featured: product.featured
          });
        } else {
          setProductNotFound(true);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setError('Error al cargar el producto');
      } finally {
        setLoadingProduct(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await productService.updateProduct(productId, formData);
      setSuccess(true);
      
      // Redirigir al dashboard después de un momento
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (error: unknown) {
      setError('Error al actualizar el producto. Intenta nuevamente.');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category,
      type: '', // Reset type when category changes
      sizes: [] // Reset sizes when category changes
    }));
  };

  if (loadingProduct) {
    return (
      <AdminGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando producto...</p>
          </div>
        </div>
      </AdminGuard>
    );
  }

  if (productNotFound) {
    return (
      <AdminGuard>
        <div className="container mx-auto px-4 py-8">
          <BackNavigation
            backUrl="/admin/dashboard"
            backLabel="Volver al dashboard"
            showHome={true}
          />
          <div className="max-w-md mx-auto mt-16 text-center">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-2">Producto no encontrado</h2>
                <p className="text-muted-foreground mb-4">
                  El producto que intentas editar no existe o ha sido eliminado.
                </p>
                <Button onClick={() => router.push('/admin/dashboard')}>
                  Volver al dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminGuard>
    );
  }

  if (success) {
    return (
      <AdminGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto mt-16 text-center">
            <Card>
              <CardContent className="pt-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Edit className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">¡Producto Actualizado!</h2>
                <p className="text-muted-foreground mb-4">
                  Los cambios se han guardado exitosamente.
                </p>
                <p className="text-sm text-muted-foreground">
                  Redirigiendo al dashboard...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-8">
        <BackNavigation
          backUrl="/admin/dashboard"
          backLabel="Volver al dashboard"
          showHome={true}
        />

        <div className="max-w-2xl mx-auto mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Editar Producto
              </CardTitle>
              <CardDescription>
                Modifica la información del producto
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del producto *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select 
                      value={formData.category}
                      onValueChange={handleCategoryChange}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tipo de producto - solo aparece si hay categoría seleccionada */}
                {formData.category && (
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Producto *</Label>
                    <Select 
                      value={formData.type}
                      onValueChange={(value) => handleInputChange('type', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {getProductTypesForCategory(formData.category).map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Selector de tallas - solo aparece si hay categoría seleccionada */}
                {formData.category && (
                  <div className="space-y-3">
                    <Label>Tallas Disponibles</Label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {getSizesForCategory(formData.category).map((size) => (
                        <div key={size.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`size-${size.value}`}
                            checked={formData.sizes.includes(size.value)}
                            onCheckedChange={() => handleSizeToggle(size.value)}
                            disabled={loading}
                          />
                          <Label 
                            htmlFor={`size-${size.value}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {size.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {formData.sizes.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Tallas seleccionadas: {formData.sizes.join(', ')}
                      </p>
                    )}
                  </div>
                )}

                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => handleInputChange('imageUrl', url)}
                  onRemove={() => handleInputChange('imageUrl', '')}
                  disabled={loading}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock disponible</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featured">Producto destacado</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="featured"
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange('featured', e.target.checked)}
                        disabled={loading}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="featured" className="text-sm font-normal">
                        Mostrar en productos destacados
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading || !formData.name || !formData.category || !formData.description}
                    className="flex-1"
                  >
                    {loading ? 'Guardando cambios...' : 'Guardar Cambios'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => router.push('/admin/dashboard')}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  );
}