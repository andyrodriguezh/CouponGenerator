/**
 * Servicio para gestionar cupones
 * Utiliza la capa de abstracción para acceder a los servicios del proveedor actual
 */

import { services } from './api/serviceProvider';
import Coupon from '../models/coupon';

/**
 * Crea un nuevo cupón
 * @param {Object} couponData - Datos del cupón
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const createCoupon = async (couponData) => {
  try {
    // Utilizamos el servicio del proveedor actual (AWS o Firebase)
    const result = await services.coupons.create(couponData);
    
    if (result.success) {
      // Convertimos los datos a nuestro modelo de negocio
      return {
        success: true,
        data: Coupon.fromJSON(result.data),
        error: null
      };
    } else {
      return result;
    }
  } catch (error) {
    console.error('Error en createCoupon:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Error al crear cupón'
    };
  }
};

/**
 * Obtiene un cupón por su ID
 * @param {string} id - ID del cupón
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const getCouponById = async (id) => {
  try {
    const result = await services.coupons.getById(id);
    
    if (result.success && result.data) {
      return {
        success: true,
        data: Coupon.fromJSON(result.data),
        error: null
      };
    } else {
      return result;
    }
  } catch (error) {
    console.error(`Error en getCouponById para ${id}:`, error);
    return {
      success: false,
      data: null,
      error: error.message || `Error al obtener cupón ${id}`
    };
  }
};

/**
 * Lista todos los cupones
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const listCoupons = async () => {
  try {
    const result = await services.coupons.list();
    
    if (result.success) {
      return {
        success: true,
        data: result.data.map(item => Coupon.fromJSON(item)),
        error: null
      };
    } else {
      return result;
    }
  } catch (error) {
    console.error('Error en listCoupons:', error);
    return {
      success: false,
      data: [],
      error: error.message || 'Error al listar cupones'
    };
  }
};

/**
 * Incrementa el contador de escaneos de un cupón
 * @param {string} id - ID del cupón
 * @returns {Promise<Object>} - Resultado de la operación
 */
export const incrementScanCount = async (id) => {
  try {
    return await services.coupons.incrementScanCount(id);
  } catch (error) {
    console.error(`Error en incrementScanCount para ${id}:`, error);
    return {
      success: false,
      data: false,
      error: error.message || `Error al incrementar contador para cupón ${id}`
    };
  }
};