import React from 'react';
import { formatDate } from '../../utils/dateUtils';

/**
 * Componente para mostrar una vista previa del cupón
 */
const CouponPreview = ({ coupon }) => {
  // Si no hay datos del cupón, mostrar un mensaje
  if (!coupon) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p>Vista previa no disponible</p>
      </div>
    );
  }

  // Formatear el valor del descuento según el tipo
  const formatDiscountValue = () => {
    switch (coupon.discountType) {
      case 'percentage':
        return `${coupon.discountValue}% OFF`;
      case 'fixed':
        return `$${coupon.discountValue} OFF`;
      case 'buyOneGetOne':
        return '2x1';
      case 'freeItem':
        return 'GRATIS';
      default:
        return coupon.discountValue || '';
    }
  };

  return (
    <div className="sticky top-5 max-w-full">
      <h3 className="text-sm font-medium mb-2 ml-2">Vista previa</h3>
      
      {/* Contenedor del cupón */}
      <div 
        className="flex flex-col w-full rounded-lg overflow-hidden shadow-md bg-white"
        style={{
          background: coupon.primaryColor || '#3182CE',
        }}
      >
        {/* Parte superior del cupón */}
        <div 
          className="w-full bg-white p-4"
          style={{
            borderBottomWidth: '2px',
            borderBottomColor: coupon.secondaryColor || '#EDF2F7',
            borderBottomStyle: 'dashed'
          }}
        >
          {/* Logo */}
          {coupon.logoUrl && (
            <div className="flex justify-center mb-3">
              <img 
                src={coupon.logoUrl} 
                alt={coupon.businessName || 'Logo'} 
                className="max-h-[60px] object-contain" 
              />
            </div>
          )}
          
          {/* Título del negocio */}
          <p 
            className="text-center font-bold text-base"
            style={{ color: coupon.textColor || '#1a202c' }}
          >
            {coupon.businessName || 'Nombre del Negocio'}
          </p>
          
          {/* Valor del descuento */}
          <p 
            className="text-3xl font-extrabold text-center my-2"
            style={{ color: coupon.textColor || '#1a202c' }}
          >
            {formatDiscountValue() || '25% OFF'}
          </p>
          
          {/* Título del cupón */}
          <p 
            className="text-lg text-center font-medium"
            style={{ color: coupon.textColor || '#1a202c' }}
          >
            {coupon.title || 'Título del Cupón'}
          </p>
          
          {/* Descripción */}
          {coupon.description && (
            <p 
              className="text-sm text-center mt-1"
              style={{ color: coupon.textColor || '#4a5568' }}
            >
              {coupon.description}
            </p>
          )}
        </div>
        
        {/* Parte inferior del cupón */}
        <div 
          className="w-full p-3"
          style={{ 
            backgroundColor: coupon.secondaryColor || '#EDF2F7',
            color: coupon.textColor || '#4a5568'
          }}
        >
          {/* Fechas de validez */}
          <p className="text-xs text-center">
            Válido hasta: {formatDate(coupon.validUntil) || '31/12/2025'}
          </p>
          
          {/* Términos y condiciones */}
          {coupon.termsAndConditions && (
            <>
              <hr className="my-2 border-t" style={{ borderColor: `${coupon.textColor}40` || '#e2e8f0' }} />
              <p className="text-[10px] text-center">
                {coupon.termsAndConditions}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponPreview;