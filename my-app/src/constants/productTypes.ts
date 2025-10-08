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
  ],
  'mujer': [
    { value: '34', label: '34' },
    { value: '36', label: '36' },
    { value: '38', label: '38' },
    { value: '40', label: '40' },
    { value: '42', label: '42' },
    { value: '44', label: '44' }
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
    { value: 'uniforme', label: 'Uniforme Escolar' },
    { value: 'jeans', label: 'Jeans' },
    { value: 'poleras-cuello-redondo', label: 'Poleras cuello redondo' },
    { value: 'polos', label: 'Polos' },
    { value: 'chaleco', label: 'Chaleco' }
  ],
  'hombre': [
    { value: 'camisa', label: 'Camisa' },
    { value: 'camisa-manga-larga', label: 'Camisa manga larga' },
    { value: 'camisa-manga-corta', label: 'Camisa manga corta' },
    { value: 'camiseta', label: 'Camiseta' },
    { value: 'polo', label: 'Polo' },
    { value: 'poleras-cuello-redondo', label: 'Poleras cuello redondo' },
    { value: 'pantalon', label: 'Pantalón' },
    { value: 'pantalon-tela-vestir', label: 'Pantalón de tela vestir' },
    { value: 'jean', label: 'Jeans' },
    { value: 'short', label: 'Short' },
    { value: 'zapatos', label: 'Zapatos' },
    { value: 'zapatillas', label: 'Zapatillas' },
    { value: 'chaqueta', label: 'Chaqueta' },
    { value: 'chamarras', label: 'Chamarras' },
    { value: 'saco', label: 'Saco' },
    { value: 'chalecos', label: 'Chalecos' },
    { value: 'sueter', label: 'Suéter' }
  ],
  'mujer': [
    { value: 'jean', label: 'Jean' }
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