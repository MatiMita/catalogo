import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  featured: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CreateProductData {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  featured: boolean;
}

class ProductService {
  private readonly COLLECTION_NAME = 'products';

  async createProduct(productData: CreateProductData): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), {
        ...productData,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async updateProduct(id: string, productData: Partial<CreateProductData>): Promise<void> {
    try {
      const productRef = doc(db, this.COLLECTION_NAME, id);
      await updateDoc(productRef, {
        ...productData,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const productRef = doc(db, this.COLLECTION_NAME, id);
      await deleteDoc(productRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const productRef = doc(db, this.COLLECTION_NAME, id);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        return {
          id: productSnap.id,
          ...productSnap.data()
        } as Product;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting product:', error);
      throw new Error('Failed to get product');
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Error getting products:', error);
      throw new Error('Failed to get products');
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      return allProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw new Error('Failed to get products by category');
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      return allProducts.filter(product => product.featured);
    } catch (error) {
      console.error('Error getting featured products:', error);
      throw new Error('Failed to get featured products');
    }
  }
}

export const productService = new ProductService();