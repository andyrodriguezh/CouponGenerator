/**
 * Servicio para manejar la generación y manipulación de códigos QR
 */

import { createShareableLink } from '../utils/apiUtils';

/**
 * Genera una URL para un cupón específico
 * @param {string} couponId - ID del cupón
 * @returns {string} - URL para acceder al cupón
 */
export const generateCouponUrl = (couponId) => {
  return createShareableLink(`/redeem/${couponId}`);
};

/**
 * Genera opciones para la configuración del código QR
 * @param {Object} options - Opciones personalizadas
 * @returns {Object} - Opciones configuradas para el componente QRCode
 */
export const getQROptions = (options = {}) => {
  // Opciones predeterminadas
  const defaultOptions = {
    size: 256,
    level: 'M',
    includeMargin: true,
    fgColor: '#000000',
    bgColor: '#FFFFFF',
  };

  return {
    ...defaultOptions,
    ...options
  };
};

/**
 * Genera un nombre de archivo para la descarga del QR
 * @param {string} couponTitle - Título del cupón
 * @returns {string} - Nombre de archivo para el QR
 */
export const generateQRFilename = (couponTitle) => {
  const sanitizedTitle = couponTitle
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
  
  const timestamp = new Date().getTime();
  return `qr-coupon-${sanitizedTitle}-${timestamp}`;
};

/**
 * Convierte un canvas a una URL de imagen
 * @param {HTMLCanvasElement} canvas - Elemento canvas con el QR
 * @param {string} type - Tipo de imagen (image/png, image/jpeg)
 * @returns {string} - URL de datos de la imagen
 */
export const canvasToImageUrl = (canvas, type = 'image/png') => {
  if (!canvas) return null;
  return canvas.toDataURL(type);
};

/**
 * Convierte un canvas a un objeto Blob
 * @param {HTMLCanvasElement} canvas - Elemento canvas con el QR
 * @param {string} type - Tipo de imagen
 * @returns {Promise<Blob>} - Promesa que resuelve a un Blob
 */
export const canvasToBlob = (canvas, type = 'image/png') => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, type);
  });
};

/**
 * Descarga un QR como imagen
 * @param {HTMLCanvasElement} canvas - Elemento canvas con el QR
 * @param {string} filename - Nombre de archivo
 * @param {string} type - Tipo de imagen
 */
export const downloadQRCode = async (canvas, filename, type = 'png') => {
  if (!canvas) return;
  
  try {
    // Obtener la URL de datos
    const dataUrl = canvasToImageUrl(canvas, `image/${type}`);
    
    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.download = `${filename}.${type}`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error al descargar QR:', error);
    throw error;
  }
};