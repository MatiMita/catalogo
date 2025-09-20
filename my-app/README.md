# O&C - E-commerce de Ropa

Un catálogo de productos de ropa moderno construido con Next.js, TypeScript, Tailwind CSS, shadcn/ui, Firebase y Cloudinary.

## 🚀 Características

- **Atomic Design**: Componentes organizados siguiendo la metodología atomic design
- **HTML Semántico**: Estructura semántica para mejor SEO y accesibilidad
- **Categorías**: Navegación por ropa de niño y hombre
- **Filtros**: Sistema de filtros lateral por tipo de producto, tallas y disponibilidad
- **Paginación**: Carga de productos con paginación infinita
- **Producto Individual**: Páginas detalladas con galería de imágenes, selector de tallas y productos relacionados
- **Cloudinary**: Integración para manejo optimizado de imágenes
- **Firebase**: Base de datos Firestore para productos, categorías y tipos
- **Responsive**: Diseño completamente responsive

## 📱 Páginas Implementadas

- **Inicio (`/`)**: Landing page con hero, carrusel de productos destacados y contacto
- **Categorías (`/categoria/[categoria]`)**: Listado de productos por categoría con filtros
- **Producto (`/producto/[id]`)**: Página detallada del producto
- **Sobre Nosotros (`/about`)**: Información de la empresa

## 🛠 Tecnologías

- **Framework**: Next.js 15 con TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Base de Datos**: Firebase Firestore
- **Imágenes**: Cloudinary
- **Icons**: Lucide React

## 🏗 Arquitectura de Componentes (Atomic Design)

```
src/components/
├── atoms/           # Componentes básicos
│   ├── Logo.tsx
│   ├── SocialIcon.tsx
│   └── ContactItem.tsx
├── molecules/       # Combinaciones de átomos
│   ├── Navigation.tsx
│   ├── ProductCard.tsx
│   ├── ProductImageGallery.tsx
│   ├── SizeSelector.tsx
│   └── ContactInfo.tsx
├── organisms/       # Secciones complejas
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ProductCarousel.tsx
│   ├── ProductFilters.tsx
│   ├── ProductGrid.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
└── ui/             # Componentes base de shadcn
```

## ⚙️ Configuración

### 1. Instalar dependencias
```bash
pnpm install
```

### 2. Configurar variables de entorno
Actualiza `.env.local` con tu configuración de Cloudinary:
```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME_AQUI
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=TU_UPLOAD_PRESET_AQUI
```

### 3. Configurar Cloudinary
1. Crea una cuenta en [Cloudinary](https://cloudinary.com)
2. Obtén tu `cloud_name` del dashboard
3. Crea un upload preset sin firma:
   - Ve a Settings > Upload presets
   - Crea un nuevo preset
   - Marca como "Unsigned"
   - Configura la carpeta como "productos"
4. Actualiza las variables en `.env.local`

### 4. Inicializar la base de datos
Ejecuta el script para crear datos de ejemplo:
```bash
pnpm run init-db
```

### 5. Subir imágenes a Cloudinary
Después de ejecutar el script de inicialización, sube imágenes para los productos usando los nombres de archivo indicados en la consola.

## 🚀 Comandos

```bash
# Desarrollo
pnpm dev

# Construcción
pnpm build

# Inicializar base de datos
pnpm run init-db

# Linting
pnpm lint
```

---

¡Gracias por usar O&C! 🎉
