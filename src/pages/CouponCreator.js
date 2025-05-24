import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCoupon } from '../services/couponService';
import BasicInformation from '../components/CouponEditor/BasicInformation';
import DesignCustomization from '../components/CouponEditor/DesignCustomization';
import TermsAndConditions from '../components/CouponEditor/TermsAndConditions';
import CouponPreview from '../components/CouponEditor/CouponPreview';
import Coupon from '../models/coupon';

/**
 * Página para la creación de nuevos cupones
 */
const CouponCreator = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, title: '', status: '', message: '' });
  
  // Estado para el cupón en edición
  const [coupon, setCoupon] = useState(new Coupon({}));
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Función para mostrar toasts/notificaciones
  const showToast = (title, message, status) => {
    setToast({ show: true, title, message, status });
    setTimeout(() => {
      setToast({ show: false, title: '', status: '', message: '' });
    }, 5000);
  };
  
  // Función para guardar el cupón
  const handleSave = async () => {
    // Validación básica de campos obligatorios
    if (!coupon.title || !coupon.businessName || !coupon.discountValue) {
      showToast(
        'Completa los campos obligatorios', 
        'El título, nombre del negocio y valor del descuento son requeridos', 
        'error'
      );
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await createCoupon(coupon);
      if (result.success) {
        showToast(
          'Cupón creado correctamente',
          '',
          'success'
        );
        
        // Redirigir a la página del nuevo cupón
        navigate(`/coupon/${result.data.id}`);
      } else {
        throw new Error(result.error || 'Error al crear el cupón');
      }
    } catch (error) {
      showToast(
        'Error',
        error.message,
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Cabecera */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col space-y-1">
            <h1 className="text-2xl font-bold">Crear nuevo cupón</h1>
            <p className="text-sm text-gray-600">
              Personaliza tu cupón de descuento y compártelo con tus clientes
            </p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md"
          >
            Volver
          </button>
        </div>
        
        <hr className="mb-6 border-gray-200" />
        
        {/* Toast/Notificaciones */}
        {toast.show && (
          <div className={`mb-4 p-4 rounded-md ${
            toast.status === 'success' 
              ? 'bg-green-100 text-green-800 border-l-4 border-green-500' 
              : 'bg-red-100 text-red-800 border-l-4 border-red-500'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {toast.status === 'success' ? (
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">{toast.title}</h3>
                {toast.message && <div className="mt-2 text-sm">{toast.message}</div>}
              </div>
            </div>
          </div>
        )}
        
        {/* Editor y preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="md:col-span-2">
            <div className="flex flex-col space-y-6">
              <BasicInformation coupon={coupon} setCoupon={setCoupon} />
              <DesignCustomization coupon={coupon} setCoupon={setCoupon} />
              <TermsAndConditions coupon={coupon} setCoupon={setCoupon} />
              
              {/* Botones de acción */}
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => navigate('/')} 
                  className="mr-4 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancelar
                </button>
                <button 
                  className={`px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : 'Guardar cupón'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Vista previa */}
          <div className="md:col-span-1">
            <CouponPreview coupon={coupon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCreator;