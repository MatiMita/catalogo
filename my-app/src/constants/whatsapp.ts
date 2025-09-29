// Configuración de WhatsApp
export const WHATSAPP_CONFIG = {
  // Número de teléfono (incluir código de país sin +)
  // Ejemplo: Para +57 300 123 4567 usar "573001234567"
  phoneNumber: "59161675074", // Cambiar por el número real
  
  // Mensaje predeterminado
  defaultMessage: "¡Hola! Me interesa conocer más sobre sus productos de ropa.",
  
  // Mensajes específicos por página (opcional)
  messages: {
    home: "¡Hola! Vi su catálogo de ropa y me interesa conocer más.",
    productos: "¡Hola! Me interesan sus productos, ¿podrían darme más información?",
    categoria: "¡Hola! Vi algunos productos en esta categoría y me gustaría más información.",
    producto: "¡Hola! Me interesa este producto específico, ¿está disponible?"
  }
};