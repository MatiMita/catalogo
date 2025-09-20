'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { openCloudinaryWidget } from '@/services/cloudinary';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
  label?: string;
}

export function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  disabled = false,
  label = "Imagen del producto"
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    
    openCloudinaryWidget(
      (result) => {
        onChange(result.secure_url);
        setUploading(false);
      },
      (error) => {
        console.error('Error uploading image:', error);
        setUploading(false);
      }
    );
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {value ? (
        <div className="relative">
          <div className="relative w-full h-64 rounded-lg border border-dashed border-gray-300 overflow-hidden">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={onRemove}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-64 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleUpload}
                disabled={disabled || uploading}
                className="relative"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
              </Button>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF hasta 10MB
              </p>
            </div>
          </div>
        </div>
      )}
      
      {value && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUpload}
            disabled={disabled || uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Subiendo...' : 'Cambiar imagen'}
          </Button>
        </div>
      )}
    </div>
  );
}