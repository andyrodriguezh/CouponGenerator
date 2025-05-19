/**
 * Utilidades para manejar API y sus respuestas
 */

/**
 * Manejador genérico de errores de API
 */
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    data: null,
    error: error.message || 'Ha ocurrido un error desconocido'
  };
};

/**
 * Formateador de respuestas de API exitosas
 */
export const formatResponse = (data) => {
  return {
    success: true,
    data,
    error: null
  };
};

/**
 * Genera un ID único usando timestamp y números aleatorios
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Convierte una ruta relativa en una URL completa
 */
export const createShareableLink = (path) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}${path}`;
};

/**
 * Simula una llamada a API para desarrollo local
 * Útil cuando no tenemos el backend configurado todavía
 */
export const simulateApiCall = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formatResponse(data));
    }, delay);
  });
};