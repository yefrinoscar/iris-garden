// Configuración del negocio
export const config = {
  // Número de WhatsApp para suscripciones (con código de país, sin + ni espacios)
  whatsapp: {
    number: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '51980617211',
    message: (plan) => `¡Hola! 👋 Me interesa suscribirme al plan *${plan.name}* (${plan.price}${plan.period}). ¿Podrían darme más información?`,
  },
  
  // Nombre del negocio
  businessName: 'El Jardín de Iris',
};
