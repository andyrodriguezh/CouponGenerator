/**
 * Utilidades para manejo de fechas
 */

/**
 * Formatea una fecha a un formato legible (DD/MM/YYYY)
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
  // Usar la función más avanzada pero manteniendo la compatibilidad
  return formatDateWithPattern(date, 'dd/MM/yyyy');
};

/**
 * Verifica si una fecha está en el pasado
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean} - true si la fecha está en el pasado
 */
export const isPastDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d < now;
};

/**
 * Verifica si una fecha está en el futuro
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean} - true si la fecha está en el futuro
 */
export const isFutureDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d > now;
};

/**
 * Calcula la diferencia en días entre dos fechas
 * @param {Date|string} date1 - Primera fecha
 * @param {Date|string} date2 - Segunda fecha
 * @returns {number} - Número de días de diferencia
 */
export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Verifica si un cupón está vigente según sus fechas
 * @param {Date|string} validFrom - Fecha de inicio de validez
 * @param {Date|string} validUntil - Fecha de fin de validez
 * @returns {boolean} - true si el cupón está vigente
 */
export const isCouponValid = (validFrom, validUntil) => {
  const now = new Date();
  const from = new Date(validFrom);
  const until = new Date(validUntil);
  
  return now >= from && now <= until;
};

/**
 * Formatea una fecha a formato ISO (YYYY-MM-DD)
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} - Fecha en formato ISO
 */
export const toISODateString = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * Formatea una fecha a un formato específico
 * @param {Date|string} date - Fecha a formatear 
 * @param {string} format - Formato deseado ('dd/MM/yyyy' por defecto, 'yyyy-MM-dd' para formato ISO)
 * @returns {string} - Fecha formateada según el formato especificado
 */
export const formatDateWithPattern = (date, format = 'dd/MM/yyyy') => {
  const d = new Date(date);
  
  if (format === 'yyyy-MM-dd') {
    return toISODateString(d);
  }
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year);
};