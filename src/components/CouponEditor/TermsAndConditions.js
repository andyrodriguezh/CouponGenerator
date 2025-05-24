import React from 'react';
import { formatDate } from '../../utils/dateUtils';

/**
 * Componente para editar los términos y condiciones del cupón
 */
const TermsAndConditions = ({ coupon, setCoupon }) => {
  // Manejador para cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon(prevCoupon => ({
      ...prevCoupon,
      [name]: value
    }));
  };

  // Manejador para cambios en las fechas
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(value);
    setCoupon(prevCoupon => ({
      ...prevCoupon,
      [name]: date
    }));
  };

  // Determinar la fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white mb-4">
      <h2 className="text-lg font-medium mb-4">Términos y Validez</h2>
      
      <div className="flex flex-col space-y-4">
        {/* Fechas de validez */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Válido desde <span className="text-red-500">*</span>
            </label>
            <input 
              type="date"
              name="validFrom"
              min={today}
              value={coupon.validFrom ? formatDate(coupon.validFrom, 'yyyy-MM-dd') : today}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Válido hasta <span className="text-red-500">*</span>
            </label>
            <input 
              type="date"
              name="validUntil"
              min={today}
              value={formatDate(coupon.validUntil, 'yyyy-MM-dd')}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        {/* Términos y condiciones */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Términos y condiciones
          </label>
          <textarea 
            name="termsAndConditions"
            value={coupon.termsAndConditions || ''}
            onChange={handleChange}
            placeholder="Ej: No válido con otras promociones. Límite un cupón por persona."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Especifica cualquier restricción o condición para el uso del cupón
          </p>
        </div>
        
        {/* Redirección */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de redirección
          </label>
          <select 
            name="redirectType" 
            value={coupon.redirectType || 'web'}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="web">Página web</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL o número de WhatsApp
          </label>
          <div className="flex">
            {coupon.redirectType === 'whatsapp' && (
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                +
              </span>
            )}
            <input 
              type="text"
              name="redirectUrl"              value={coupon.redirectUrl || ''}
              onChange={handleChange}
              placeholder={
                coupon.redirectType === 'web' 
                  ? 'https://mitienda.com/promociones' 
                  : '5491122334455'
              }
              className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                ${coupon.redirectType === 'whatsapp' ? 'rounded-r-md' : 'rounded-md'}`}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {coupon.redirectType === 'web' 
              ? 'URL completa incluyendo https://' 
              : 'Número de teléfono sin espacios ni símbolos'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;