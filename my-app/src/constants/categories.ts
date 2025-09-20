// Categorías válidas del sistema
export const CATEGORIES = [
  { value: 'niño', label: 'Ropa para Niño' },
  { value: 'hombre', label: 'Ropa para Hombre' }
] as const;

export type CategoryValue = typeof CATEGORIES[number]['value'];