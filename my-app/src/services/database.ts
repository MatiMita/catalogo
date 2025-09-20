import { db } from '@/app/lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { Product, Category, ProductType, FilterParams, PaginationParams } from '@/types';

// Colecciones
const PRODUCTS_COLLECTION = 'products';
const CATEGORIES_COLLECTION = 'categories';
const PRODUCT_TYPES_COLLECTION = 'productTypes';

// Productos
export const productService = {
  // Obtener todos los productos con filtros y paginación
  async getProducts(
    filters: FilterParams = {}, 
    pagination: PaginationParams = { page: 1, limit: 12 },
    lastDoc?: QueryDocumentSnapshot<DocumentData>
  ) {
    let q = query(collection(db, PRODUCTS_COLLECTION));

    // Aplicar filtros
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }
    
    if (filters.inStock !== undefined) {
      q = query(q, where('inStock', '==', filters.inStock));
    }

    // Ordenar por fecha de creación
    q = query(q, orderBy('createdAt', 'desc'));

    // Paginación
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    q = query(q, limit(pagination.limit));

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    return {
      products,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
      hasMore: snapshot.docs.length === pagination.limit
    };
  },

  // Obtener producto por ID
  async getProductById(id: string): Promise<Product | null> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    
    return null;
  },

  // Obtener productos relacionados (del mismo tipo)
  async getRelatedProducts(type: string, excludeId: string, limitCount = 4): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('type', '==', type),
      where('inStock', '==', true),
      limit(limitCount + 1) // +1 para excluir el producto actual
    );

    const snapshot = await getDocs(q);
    const products = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }) as Product)
      .filter(product => product.id !== excludeId)
      .slice(0, limitCount);

    return products;
  },

  // Obtener productos destacados
  async getFeaturedProducts(limitCount = 8): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('featured', '==', true),
      where('inStock', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  },

  // Crear producto
  async createProduct(product: Omit<Product, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  },

  // Actualizar producto
  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  },

  // Eliminar producto
  async deleteProduct(id: string): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  }
};

// Categorías
export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Category[];
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const q = query(collection(db, CATEGORIES_COLLECTION), where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Category;
    }
    
    return null;
  }
};

// Tipos de productos
export const productTypeService = {
  async getProductTypes(category?: string): Promise<ProductType[]> {
    let q = query(collection(db, PRODUCT_TYPES_COLLECTION));
    
    if (category) {
      q = query(q, where('category', '==', category));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProductType[];
  }
};