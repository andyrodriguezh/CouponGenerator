/**
 * Implementación de mock para desarrollo local
 * No requiere conexión a servicios reales de AWS
 */

import { v4 as uuidv4 } from 'uuid';

// Almacenamiento en memoria para los datos de la aplicación
const mockDatabase = {
  coupons: [
    {
      id: '1',
      title: 'Cupón de ejemplo',
      businessName: 'Empresa Demo',
      logoUrl: 'https://via.placeholder.com/150',
      description: 'Este es un cupón de ejemplo para desarrollo.',
      discountType: 'percentage',
      discountValue: '25',
      primaryColor: '#4caf50',
      secondaryColor: '#e8f5e9',
      textColor: '#1a1a1a',
      validFrom: new Date('2025-01-01').toISOString(),
      validUntil: new Date('2025-12-31').toISOString(),
      termsAndConditions: 'Solo un cupón por persona. No acumulable con otras promociones.',
      redirectUrl: 'https://example.com',
      redirectType: 'web',
      createdAt: new Date('2025-01-01').toISOString(),
      updatedAt: new Date('2025-01-01').toISOString(),
      scanCount: 5
    }
  ],
  images: {
    'logo-example.png': 'https://via.placeholder.com/150'
  }
};

// Simular retraso de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Implementación de servicios con datos locales
const mockServices = {
  // Servicio de Cupones
  coupons: {
    // Crear un nuevo cupón
    create: async (couponData) => {
      await delay(300); // Simular retraso de red
      
      const id = uuidv4();
      const timestamp = new Date().toISOString();
      
      const newCoupon = {
        id,
        ...couponData,
        createdAt: timestamp,
        updatedAt: timestamp,
        scanCount: 0
      };
      
      mockDatabase.coupons.push(newCoupon);
      
      return {
        success: true,
        data: newCoupon,
        error: null
      };
    },
    
    // Obtener un cupón por ID
    getById: async (id) => {
      await delay(200); // Simular retraso de red
      
      const coupon = mockDatabase.coupons.find(c => c.id === id);
      
      if (coupon) {
        return {
          success: true,
          data: { ...coupon },
          error: null
        };
      }
      
      return {
        success: false,
        data: null,
        error: `Cupón con ID ${id} no encontrado`
      };
    },
    
    // Listar todos los cupones
    list: async () => {
      await delay(300); // Simular retraso de red
      
      return {
        success: true,
        data: [...mockDatabase.coupons],
        error: null
      };
    },
    
    // Incrementar contador de escaneos
    incrementScanCount: async (id) => {
      await delay(100); // Simular retraso de red
      
      const couponIndex = mockDatabase.coupons.findIndex(c => c.id === id);
      
      if (couponIndex >= 0) {
        mockDatabase.coupons[couponIndex].scanCount += 1;
        return {
          success: true,
          data: true,
          error: null
        };
      }
      
      return {
        success: false,
        data: false,
        error: `Cupón con ID ${id} no encontrado`
      };
    }
  },
  
  // Servicio de Almacenamiento
  storage: {
    // Subir una imagen
    uploadImage: async (file, path) => {
      await delay(500); // Simular retraso de red
      
      const key = path;
      // Simular almacenamiento (usar URL de placeholder para desarrollo)
      mockDatabase.images[key] = `https://via.placeholder.com/300`;
      
      return {
        success: true,
        data: key,
        error: null
      };
    },
    
    // Obtener URL de una imagen
    getImageUrl: async (key) => {
      await delay(200); // Simular retraso de red
      
      const url = mockDatabase.images[key] || 'https://via.placeholder.com/150';
      
      return {
        success: true,
        data: url,
        error: null
      };
    }
  }
};

export default mockServices;
