export interface ProductTypeOption {
  value: string;
  label: string;
}

export interface ProductTypesByCategory {
  [category: string]: ProductTypeOption[];
}

// Tallas por categoría
export const SIZES_BY_CATEGORY: ProductTypesByCategory = {
  'niño': [
    { value: '2', label: '2' },
    { value: '4', label: '4' },
    { value: '6', label: '6' },
    { value: '8', label: '8' },
    { value: '10', label: '10' },
    { value: '12', label: '12' },
    { value: '14', label: '14' }
  ],
  'hombre': [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' }
  ]
};

// Función para obtener tallas por categoría
export const getSizesForCategory = (category: string): ProductTypeOption[] => {
  return SIZES_BY_CATEGORY[category] || [];
};

// Mantener SIZES para compatibilidad hacia atrás (deprecated)
export const SIZES: ProductTypeOption[] = SIZES_BY_CATEGORY['hombre'];

// Tipos de productos organizados por categoría
export const PRODUCT_TYPES_BY_CATEGORY: ProductTypesByCategory = {
  'niño': [
    { value: 'camisa', label: 'Camisa' },
    { value: 'camiseta', label: 'Camiseta' },
    { value: 'pantalon', label: 'Pantalón' },
    { value: 'short', label: 'Short' },
    { value: 'zapatos', label: 'Zapatos' },
    { value: 'zapatillas', label: 'Zapatillas' },
    { value: 'chaqueta', label: 'Chaqueta' },
    { value: 'sueter', label: 'Suéter' },
    { value: 'pijama', label: 'Pijama' },
    { value: 'uniforme', label: 'Uniforme Escolar' }
  ],
  'hombre': [
    { value: 'camisa', label: 'Camisa' },
    { value: 'camiseta', label: 'Camiseta' },
    { value: 'polo', label: 'Polo' },
    { value: 'pantalon', label: 'Pantalón' },
    { value: 'jean', label: 'Jean' },
    { value: 'short', label: 'Short' },
    { value: 'zapatos', label: 'Zapatos' },
    { value: 'zapatillas', label: 'Zapatillas' },
    { value: 'chaqueta', label: 'Chaqueta' },
    { value: 'saco', label: 'Saco' },
    { value: 'chaleco', label: 'Chaleco' },
    { value: 'sueter', label: 'Suéter' }
  ]
};

// Obtener tipos de productos para una categoría específica
export const getProductTypesForCategory = (category: string): ProductTypeOption[] => {
  return PRODUCT_TYPES_BY_CATEGORY[category] || [];
};

// Obtener todos los tipos de productos únicos
export const getAllProductTypes = (): ProductTypeOption[] => {
  const allTypes = new Set<string>();
  const typeOptions: ProductTypeOption[] = [];
  
  Object.values(PRODUCT_TYPES_BY_CATEGORY).forEach(types => {
    types.forEach(type => {
      if (!allTypes.has(type.value)) {
        allTypes.add(type.value);
        typeOptions.push(type);
      }
    });
  });
  
  return typeOptions.sort((a, b) => a.label.localeCompare(b.label));
};