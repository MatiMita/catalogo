// Script para inicializar la base de datos con datos de ejemplo
// Ejecutar: pnpm tsx src/scripts/initDatabase.ts

import { db } from '../app/lib/firebase';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';

// Datos de ejemplo para categorías
const categories = [
  {
    name: 'Ropa para Niño',
    slug: 'niño',
    description: 'Ropa cómoda y divertida para los más pequeños de la casa',
    image: 'categoria-nino',
    productCount: 0
  },
  {
    name: 'Ropa para Hombre',
    slug: 'hombre', 
    description: 'Moda masculina elegante y versátil para todas las ocasiones',
    image: 'categoria-hombre',
    productCount: 0
  },
  {
    name: 'Ropa para Mujer',
    slug: 'mujer',
    description: 'Moda femenina elegante y moderna para todas las ocasiones',
    image: 'categoria-mujer',
    productCount: 0
  }
];

// Datos de ejemplo para tipos de productos
const productTypes = [
  // Para niños
  { name: 'Camisetas', slug: 'camisetas', category: 'niño', description: 'Camisetas cómodas para niños' },
  { name: 'Pantalones', slug: 'pantalones', category: 'niño', description: 'Pantalones resistentes para el juego' },
  { name: 'Shorts', slug: 'shorts', category: 'niño', description: 'Shorts frescos para el verano' },
  { name: 'Sudaderas', slug: 'sudaderas', category: 'niño', description: 'Sudaderas abrigadas para el frío' },
  { name: 'Pijamas', slug: 'pijamas', category: 'niño', description: 'Pijamas suaves para un buen descanso' },
  
  // Para hombres
  { name: 'Camisas', slug: 'camisas', category: 'hombre', description: 'Camisas elegantes para toda ocasión' },
  { name: 'Camisetas', slug: 'camisetas-hombre', category: 'hombre', description: 'Camisetas casuales y deportivas' },
  { name: 'Pantalones', slug: 'pantalones-hombre', category: 'hombre', description: 'Pantalones formales e informales' },
  { name: 'Jeans', slug: 'jeans', category: 'hombre', description: 'Denim de calidad premium' },
  { name: 'Chaquetas', slug: 'chaquetas', category: 'hombre', description: 'Chaquetas para todas las temporadas' },
  
  // Para mujeres
  { name: 'Jean', slug: 'jean', category: 'mujer', description: 'Jeans modernos y cómodos para mujer' }
];

// Datos de ejemplo para productos
const sampleProducts = [
  // Productos para niños
  {
    name: 'Camiseta Dinosaurios',
    description: 'Camiseta colorida con estampado de dinosaurios, perfecta para aventuras diarias. Fabricada en algodón 100% suave y transpirable.',
    category: 'niño',
    type: 'camisetas',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    images: ['sample-camiseta-dinosaurios'], // Reemplazar con IDs reales de Cloudinary
    featured: true,
    inStock: true
  },
  {
    name: 'Pantalón Cargo Aventura',
    description: 'Pantalón resistente con múltiples bolsillos, ideal para explorar y jugar. Tela duradera que resiste el uso diario.',
    category: 'niño',
    type: 'pantalones',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    images: ['sample-pantalon-cargo'],
    featured: false,
    inStock: true
  },
  {
    name: 'Short Deportivo Azul',
    description: 'Short transpirable perfecto para actividades deportivas y juegos al aire libre. Cintura elástica para mayor comodidad.',
    category: 'niño',
    type: 'shorts',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    images: ['sample-short-deportivo'],
    featured: false,
    inStock: true
  },
  {
    name: 'Sudadera Superhéroes',
    description: 'Sudadera con capucha y estampado de superhéroes. Interior suave y afelpado para máximo confort.',
    category: 'niño',
    type: 'sudaderas',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    images: ['sample-sudadera-superheroes'],
    featured: true,
    inStock: true
  },
  {
    name: 'Pijama Espacial',
    description: 'Conjunto de pijama con temática espacial. Incluye camiseta y pantalón en algodón orgánico super suave.',
    category: 'niño',
    type: 'pijamas',
    sizes: ['2T', '3T', '4T', '5T', '6T'],
    images: ['sample-pijama-espacial'],
    featured: false,
    inStock: true
  },

  // Productos para hombres
  {
    name: 'Camisa Formal Blanca',
    description: 'Camisa clásica de vestir en algodón premium. Corte regular con detalles refinados, ideal para eventos formales.',
    category: 'hombre',
    type: 'camisas',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['sample-camisa-formal'],
    featured: true,
    inStock: true
  },
  {
    name: 'Camiseta Básica Negro',
    description: 'Camiseta esencial en algodón suave. Corte moderno y versátil, perfecta para looks casuales o deportivos.',
    category: 'hombre',
    type: 'camisetas-hombre',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['sample-camiseta-basica'],
    featured: false,
    inStock: true
  },
  {
    name: 'Jean Slim Fit Azul',
    description: 'Jean de corte ajustado en denim premium. Diseño moderno con lavado clásico, ideal para cualquier ocasión.',
    category: 'hombre',
    type: 'jeans',
    sizes: ['30', '32', '34', '36', '38'],
    images: ['sample-jean-slim'],
    featured: true,
    inStock: true
  },
  {
    name: 'Pantalón Chino Beige',
    description: 'Pantalón chino versátil en algodón elastizado. Perfecto para looks smart-casual y uso diario.',
    category: 'hombre',
    type: 'pantalones-hombre',
    sizes: ['30', '32', '34', '36', '38'],
    images: ['sample-chino-beige'],
    featured: false,
    inStock: true
  },
  {
    name: 'Chaqueta Bomber Negra',
    description: 'Chaqueta bomber contemporánea con forro interior. Diseño urbano y funcional para temporadas frescas.',
    category: 'hombre',
    type: 'chaquetas',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['sample-bomber-negra'],
    featured: true,
    inStock: true
  },

  // Productos para mujeres
  {
    name: 'Jean Skinny Azul',
    description: 'Jean skinny de corte moderno en denim de alta calidad. Perfecto para cualquier ocasión.',
    category: 'mujer',
    type: 'jean',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['sample-jean-skinny-azul'],
    featured: true,
    inStock: true
  },
  {
    name: 'Jean Mom Vintage',
    description: 'Jean mom de tiro alto con estilo vintage. Cómodo y a la moda para looks casuales.',
    category: 'mujer',
    type: 'jean',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['sample-jean-mom-vintage'],
    featured: false,
    inStock: true
  },
  {
    name: 'Jean Recto Clásico',
    description: 'Jean de corte recto clásico en denim suave. Versátil y cómodo para uso diario.',
    category: 'mujer',
    type: 'jean',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['sample-jean-recto-clasico'],
    featured: false,
    inStock: true
  }
];

async function initializeDatabase() {
  try {
    console.log('🚀 Iniciando configuración de base de datos...');

    // Crear batch para operaciones múltiples
    const batch = writeBatch(db);

    // 1. Agregar categorías
    console.log('📁 Creando categorías...');
    for (const category of categories) {
      const categoryRef = doc(collection(db, 'categories'));
      batch.set(categoryRef, {
        ...category,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // 2. Agregar tipos de productos
    console.log('🏷️ Creando tipos de productos...');
    for (const type of productTypes) {
      const typeRef = doc(collection(db, 'productTypes'));
      batch.set(typeRef, {
        ...type,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Ejecutar el batch de categorías y tipos
    await batch.commit();
    console.log('✅ Categorías y tipos de productos creados exitosamente');

    // 3. Agregar productos (uno por uno debido al límite de batch)
    console.log('👕 Creando productos de ejemplo...');
    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    console.log('🎉 ¡Base de datos inicializada exitosamente!');
    console.log(`📊 Se crearon:
    - ${categories.length} categorías
    - ${productTypes.length} tipos de productos  
    - ${sampleProducts.length} productos de ejemplo`);

    console.log(`
    🔧 Próximos pasos:
    1. Configura tu Cloudinary cloud name y upload preset en .env.local
    2. Sube las imágenes de los productos a Cloudinary
    3. Actualiza los IDs de las imágenes en los productos
    4. ¡Tu catálogo estará listo!
    `);

  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error);
  }
}

// Ejecutar el script si es llamado directamente
if (require.main === module) {
  initializeDatabase();
}

export { initializeDatabase };