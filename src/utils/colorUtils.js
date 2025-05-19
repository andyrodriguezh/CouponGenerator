/**
 * Utilidades para manejar colores
 */

/**
 * Convierte un color RGB a hexadecimal
 * @param {number} r - Valor rojo (0-255)
 * @param {number} g - Valor verde (0-255)
 * @param {number} b - Valor azul (0-255)
 * @returns {string} - Color en formato hexadecimal (#RRGGBB)
 */
export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Convierte un color hexadecimal a RGB
 * @param {string} hex - Color en formato hexadecimal
 * @returns {Object} - Objeto con propiedades r, g, b
 */
export const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

/**
 * Determina si un color es claro u oscuro
 * @param {string} hexColor - Color en formato hexadecimal
 * @returns {boolean} - true si el color es oscuro
 */
export const isDarkColor = (hexColor) => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return false;
  
  // Fórmula para determinar el brillo del color
  // https://www.w3.org/TR/AERT/#color-contrast
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness < 128;
};

/**
 * Genera un color de texto (blanco o negro) basado en el color de fondo
 * @param {string} backgroundColor - Color de fondo en formato hexadecimal
 * @returns {string} - '#FFFFFF' para blanco o '#000000' para negro
 */
export const getContrastTextColor = (backgroundColor) => {
  return isDarkColor(backgroundColor) ? '#FFFFFF' : '#000000';
};

/**
 * Genera un color aleatorio en formato hexadecimal
 * @returns {string} - Color aleatorio
 */
export const getRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};