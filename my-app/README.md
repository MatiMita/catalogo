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

### 1. Clona el repositorio
```bash
git clone [tu-repositorio]
cd catalogo/my-app
```

### 2. Instala dependencias
```bash
pnpm install
```

### 3. Configura las variables de entorno
Copia `.env.example` a `.env.local` y completa con tus credenciales:

```bash
cp .env.example .env.local
```

**Nota**: Para producción en Vercel, configura estas variables directamente en el dashboard de Vercel. El CI/CD no necesita estas variables ya que Vercel las maneja automáticamente.

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
