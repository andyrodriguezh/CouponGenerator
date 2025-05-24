import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCouponById, incrementScanCount } from '../services/couponService';
import { formatDate, isCouponValid } from '../utils/dateUtils';
import QRGenerator from '../components/QRCode/QRGenerator';
import { generateCouponUrl } from '../services/qrService';

const CouponRedeem = () => {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scanRegistered, setScanRegistered] = useState(false);
  
  useEffect(() => {
    const fetchCoupon = async () => {
      setLoading(true);
      try {
        // Obtener el cupón
        const result = await getCouponById(id);
        
        if (result.success && result.data) {
          setCoupon(result.data);
          
          // Registrar escaneo si no se ha hecho ya
          if (!scanRegistered) {
            await incrementScanCount(id);
            setScanRegistered(true);
          }
        } else {
          setError(result.error || 'Cupón no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el cupón');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoupon();
  }, [id, scanRegistered]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (error || !coupon) {
    return (
      <div className="container mx-auto max-w-md py-10 px-4">
        <div className="flex p-4 bg-red-100 border-l-4 border-red-500 rounded-md">
          <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700">{error || 'Cupón no encontrado'}</p>
        </div>
      </div>
    );
  }
  
  const isValid = isCouponValid(coupon.validFrom, coupon.validUntil);
  
  // Use custom colors from coupon or fallback to defaults
  const bgColor = coupon.primaryColor || 'bg-primary-600';
  const textColor = coupon.textColor || 'text-gray-800';
  
  return (
    <div 
      className={`min-h-screen pt-8 pb-16 ${bgColor}`}
      style={{ 
        backgroundColor: coupon.primaryColor?.startsWith('#') ? coupon.primaryColor : undefined,
        color: coupon.textColor?.startsWith('#') ? coupon.textColor : undefined
      }}
    >
      <div className="container mx-auto max-w-md px-4">
        <div 
          className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-lg"
        >
          {/* Logo de la empresa */}
          {coupon.logoUrl && (
            <div className="w-full text-center mb-2">
              <img 
                src={coupon.logoUrl} 
                alt={coupon.businessName} 
                className="max-h-24 mx-auto" 
              />
            </div>
          )}
          
          {/* Información del descuento */}
          <div 
            className={`text-xl py-2 px-4 font-bold text-center rounded-full ${
              isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {coupon.discountType === 'percentage'
              ? `${coupon.discountValue}% OFF`
              : coupon.discountValue
            }
          </div>
          
          <h1 className="text-xl font-bold text-center">
            {coupon.title}
          </h1>
          
          <p className="text-center text-base">
            {coupon.description}
          </p>
          
          <hr className="border-t border-gray-200" />
          
          {/* Validez del cupón */}
          <div className="flex w-full justify-between text-sm">
            <p>Válido hasta:</p>
            <p className="font-bold">{formatDate(coupon.validUntil)}</p>
          </div>
          
          {!isValid && (
            <div className="flex p-3 bg-red-100 border-l-4 border-red-500 rounded-md text-sm">
              <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700">Este cupón ha expirado</p>
            </div>
          )}
          
          {/* Términos y condiciones */}
          {coupon.termsAndConditions && (
            <div className="text-xs w-full mt-2">
              <p className="font-bold">Términos y condiciones:</p>
              <p>{coupon.termsAndConditions}</p>
            </div>
          )}
          
          {/* Botón de acción */}
          {coupon.redirectUrl && (
            <a
              className={`w-full py-2 px-4 text-center font-medium rounded-md mt-4 ${
                isValid 
                  ? 'bg-secondary-600 hover:bg-secondary-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              href={isValid ? coupon.redirectUrl : '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {coupon.redirectType === 'whatsapp' ? 'Contactar por WhatsApp' : 'Visitar sitio web'}
            </a>
          )}
        </div>
        
        {/* Código QR para compartir */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-medium text-center">
              Comparte este cupón
            </h3>
            <QRGenerator
              value={generateCouponUrl(coupon.id)}
              title={coupon.title}
              size={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponRedeem;