import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCouponById } from '../services/couponService';
import { formatDate, isCouponValid, daysBetween } from '../utils/dateUtils';
import QRGenerator from '../components/QRCode/QRGenerator';
import { generateCouponUrl } from '../services/qrService';

/**
 * Página para ver los detalles y métricas de un cupón
 */
const CouponDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar datos del cupón
  useEffect(() => {
    const fetchCoupon = async () => {
      setLoading(true);
      try {
        const result = await getCouponById(id);
        
        if (result.success && result.data) {
          setCoupon(result.data);
        } else {
          setError(result.error || 'Error al cargar el cupón');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoupon();
  }, [id]);
  
  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  // Si hay error, mostrar alerta
  if (error || !coupon) {
    return (
      <div className="container mx-auto max-w-4xl py-10 px-4">
        <div className="flex p-4 bg-red-100 border-l-4 border-red-500 rounded-md">
          <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700">{error || 'Cupón no encontrado'}</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md"
        >
          Volver al inicio
        </button>
      </div>
    );
  }
  
  // Verificar si el cupón está vigente
  const isValid = isCouponValid(coupon.validFrom, coupon.validUntil);
  const daysRemaining = isValid ? daysBetween(new Date(), coupon.validUntil) : 0;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Cabecera */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-bold">{coupon.title}</h1>
            <p className="text-gray-600">{coupon.businessName}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md"
            >
              Volver
            </button>
          </div>
        </div>
        
        <hr className="mb-6 border-gray-200" />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Información principal */}
          <div className="lg:col-span-3">
            <div className="flex flex-col space-y-6">
              {/* Detalles del cupón */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Detalles del cupón</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Tipo de descuento</p>
                    <p>
                      {coupon.discountType === 'percentage' ? 'Porcentaje' : 
                       coupon.discountType === 'fixed' ? 'Monto fijo' :
                       coupon.discountType === 'buyOneGetOne' ? '2x1' : 
                       'Producto gratis'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Valor</p>
                    <p>
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : 
                       coupon.discountType === 'fixed' ? `$${coupon.discountValue}` : 
                       coupon.discountValue}
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Válido desde</p>
                    <p>{formatDate(coupon.validFrom)}</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Válido hasta</p>
                    <p>{formatDate(coupon.validUntil)}</p>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Estado</p>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isValid ? 'Activo' : 'Expirado'}
                    </span>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Creado</p>
                    <p>{formatDate(coupon.createdAt)}</p>
                  </div>
                </div>
                
                {coupon.description && (
                  <div className="mt-4">
                    <p className="font-semibold">Descripción</p>
                    <p>{coupon.description}</p>
                  </div>
                )}
                
                {coupon.termsAndConditions && (
                  <div className="mt-4">
                    <p className="font-semibold">Términos y condiciones</p>
                    <p className="text-sm">{coupon.termsAndConditions}</p>
                  </div>
                )}
                
                {coupon.redirectUrl && (
                  <div className="mt-4">
                    <p className="font-semibold">Redirección</p>
                    <p>
                      {coupon.redirectType === 'whatsapp' ? 'WhatsApp: ' : 'Web: '}
                      {coupon.redirectUrl}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Métricas del cupón */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Métricas del cupón</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Escaneos totales</p>
                    <p className="text-3xl font-bold">{coupon.scanCount || 0}</p>
                    <p className="text-xs text-gray-500">Desde la creación</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <p className="text-3xl font-bold">{isValid ? 'Activo' : 'Expirado'}</p>
                    <p className="text-xs text-gray-500">
                      {isValid ? `${daysRemaining} días restantes` : 'Promoción finalizada'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* QR y acciones */}
          <div className="lg:col-span-2">
            <div className="flex flex-col space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-lg font-bold mb-4 text-center">Código QR</h2>
                <div className="flex justify-center">
                  <QRGenerator
                    value={generateCouponUrl(coupon.id)}
                    title={coupon.title}
                    size={240}
                  />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md w-full">
                <h2 className="text-lg font-bold mb-4">Acciones</h2>
                <div className="flex flex-col space-y-3">
                  <button 
                    className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md"
                    onClick={() => navigate(`/redeem/${coupon.id}`)}
                  >
                    Ver cupón para clientes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetails;