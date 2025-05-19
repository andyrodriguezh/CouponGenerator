/**
 * Implementación de servicios utilizando AWS
 */

import { Amplify } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

// En las versiones más recientes de Amplify, necesitamos usar namespaces
const API = Amplify.API;
const Storage = Amplify.Storage;

// Configuración de AWS Amplify
export const configureAWS = (config) => {
  // Esta función será llamada al inicio de la aplicación
  // para configurar Amplify con las credenciales y endpoints
};

// Servicios implementados con AWS
const awsServices = {
  // Servicio de Cupones
  coupons: {
    // Crear un nuevo cupón
    create: async (couponData) => {
      try {
        const id = uuidv4();
        const timestamp = new Date().toISOString();
        
        const newCoupon = {
          id,
          ...couponData,
          createdAt: timestamp,
          updatedAt: timestamp,
          scanCount: 0
        };
        
        await API.post('couponsApi', '/coupons', { body: newCoupon });
        return {
          success: true,
          data: newCoupon,
          error: null
        };
      } catch (error) {
        console.error('Error al crear cupón:', error);
        return {
          success: false,
          data: null,
          error: error.message || 'Error al crear cupón'
        };
      }
    },
    
    // Obtener un cupón por ID
    getById: async (id) => {
      try {
        const coupon = await API.get('couponsApi', `/coupons/${id}`);
        return {
          success: true,
          data: coupon,
          error: null
        };
      } catch (error) {
        console.error(`Error al obtener el cupón ${id}:`, error);
        return {
          success: false,
          data: null,
          error: error.message || `Error al obtener el cupón ${id}`
        };
      }
    },
    
    // Listar todos los cupones
    list: async () => {
      try {
        const coupons = await API.get('couponsApi', '/coupons');
        return {
          success: true,
          data: coupons,
          error: null
        };
      } catch (error) {
        console.error('Error al listar cupones:', error);
        return {
          success: false,
          data: [],
          error: error.message || 'Error al listar cupones'
        };
      }
    },
    
    // Incrementar contador de escaneos
    incrementScanCount: async (id) => {
      try {
        await API.put('couponsApi', `/coupons/${id}/scan`, {});
        return {
          success: true,
          data: true,
          error: null
        };
      } catch (error) {
        console.error(`Error al incrementar contador para cupón ${id}:`, error);
        return {
          success: false,
          data: false,
          error: error.message || `Error al incrementar contador para cupón ${id}`
        };
      }
    }
  },
  
  // Servicio de Almacenamiento
  storage: {
    // Subir una imagen
    uploadImage: async (file, path) => {
      try {
        const result = await Storage.put(path, file, {
          contentType: file.type,
        });
        return {
          success: true,
          data: result.key,
          error: null
        };
      } catch (error) {
        console.error('Error al subir imagen:', error);
        return {
          success: false,
          data: null,
          error: error.message || 'Error al subir imagen'
        };
      }
    },
    
    // Obtener URL de una imagen
    getImageUrl: async (key) => {
      try {
        const url = await Storage.get(key);
        return {
          success: true,
          data: url,
          error: null
        };
      } catch (error) {
        console.error(`Error al obtener URL de la imagen ${key}:`, error);
        return {
          success: false,
          data: null,
          error: error.message || `Error al obtener URL de la imagen ${key}`
        };
      }
    }
  }
};

export default awsServices;
