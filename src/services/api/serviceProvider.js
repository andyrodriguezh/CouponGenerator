/**
 * Proveedor de servicios abstracto que permite cambiar entre AWS y Firebase
 * Esta capa de abstracción facilita la migración entre proveedores de servicios cloud
 */

// Configuración para determinar qué proveedor usar
// Si cambiamos a Firebase en el futuro, solo necesitamos cambiar esta constante
// Para desarrollo y pruebas, usamos MOCK
export const CURRENT_PROVIDER = 'MOCK'; // 'AWS' | 'FIREBASE' | 'MOCK'

// Factory para obtener la implementación correcta según el proveedor configurado
export const getServiceImplementation = () => {
  if (CURRENT_PROVIDER === 'AWS') {
    return require('./awsImplementation').default;
  } else if (CURRENT_PROVIDER === 'FIREBASE') {
    return require('./firebaseImplementation').default;
  } else if (CURRENT_PROVIDER === 'MOCK') {
    return require('./mockImplementation').default;
  } else {
    throw new Error(`Provider ${CURRENT_PROVIDER} not supported`);
  }
};

// Exportamos las interfaces de servicio que toda implementación debe cumplir
export const services = getServiceImplementation();
