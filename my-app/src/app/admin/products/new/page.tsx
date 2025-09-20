'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Plus } from 'lucide-react';

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    imageUrl: '',
    stock: 1,
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await productService.createProduct(formData);
      setSuccess(true);
      
      // Redirigir al dashboard después de un momento
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (error: unknown) {
      setError('Error al crear el producto. Intenta nuevamente.');
      console.error('Error creating product:', error);
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

  if (success) {
    return (
      <AdminGuard>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto mt-16 text-center">
            <Card>
              <CardContent className="pt-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">¡Producto Creado!</h2>
                <p className="text-muted-foreground mb-4">
                  El producto se ha añadido exitosamente al catálogo.
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
                <Plus className="h-5 w-5" />
                Agregar Nuevo Producto
              </CardTitle>
              <CardDescription>
                Completa la información del producto que deseas añadir al catálogo
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
                      onValueChange={(value) => handleInputChange('category', value)}
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
                    {loading ? 'Creando producto...' : 'Crear Producto'}
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