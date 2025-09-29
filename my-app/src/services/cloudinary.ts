import { CloudinaryConfig } from '@/types';

// Tipos para Cloudinary
interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
  [key: string]: unknown;
}

interface CloudinaryError {
  message: string;
  status: number;
  [key: string]: unknown;
}

interface CloudinaryWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: CloudinaryError | null, result: { event: string; info: CloudinaryUploadResult } | null) => void
      ) => CloudinaryWidget;
    };
  }
}

// Configuración de Cloudinary - Actualiza estos valores con tu configuración
export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'TU_CLOUD_NAME_AQUI',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'TU_UPLOAD_PRESET_AQUI'
};

// URL base para transformaciones de Cloudinary
export const getCloudinaryUrl = (publicId: string, transformations?: string): string => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  
  if (transformations) {
    return `${baseUrl}/${transformations}/${publicId}`;
  }
  
  return `${baseUrl}/${publicId}`;
};

// Transformaciones comunes
export const cloudinaryTransformations = {
  thumbnail: 'w_300,h_300,c_fill,q_auto,f_auto',
  productCard: 'w_400,h_400,c_fill,q_auto,f_auto',
  productDetail: 'w_800,h_800,c_fill,q_auto,f_auto',
  carousel: 'w_1200,h_600,c_fill,q_auto,f_auto'
};

// Helper para obtener URL optimizada de imagen
export const getOptimizedImageUrl = (
  imageUrlOrPublicId: string, 
  transformation: keyof typeof cloudinaryTransformations = 'productCard'
): string => {
  // Si ya es una URL completa, devolverla tal como está
  if (imageUrlOrPublicId.startsWith('http://') || imageUrlOrPublicId.startsWith('https://')) {
    return imageUrlOrPublicId;
  }
  
  // Si es un publicId, construir la URL de Cloudinary
  return getCloudinaryUrl(imageUrlOrPublicId, cloudinaryTransformations[transformation]);
};

// Widget de upload de Cloudinary (para futuras funcionalidades de admin)
export const openCloudinaryWidget = (
  onSuccess: (result: CloudinaryUploadResult) => void,
  onError?: (error: CloudinaryError) => void
) => {
  if (typeof window !== 'undefined' && window.cloudinary) {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryConfig.cloudName,
        uploadPreset: cloudinaryConfig.uploadPreset,
        sources: ['local', 'url', 'camera'],
        showAdvancedOptions: false,
        cropping: true,
        multiple: false,
        folder: 'productos',
        tags: ['catalogo'],
        context: { alt: 'Imagen de producto' }
      },
      (error: CloudinaryError | null, result: { event: string; info: CloudinaryUploadResult } | null) => {
        if (error && onError) {
          onError(error);
        }
        
        if (!error && result && result.event === "success") {
          onSuccess(result.info);
        }
      }
    );
    
    widget.open();
  } else {
    console.error('Cloudinary widget no está disponible');
  }
};