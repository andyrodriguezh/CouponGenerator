import React from 'react';

/**
 * Componente para editar la información básica de un cupón
 */
const BasicInformation = ({ coupon, setCoupon }) => {
  // Manejador para cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon(prevCoupon => ({
      ...prevCoupon,
      [name]: value
    }));
  };
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white mb-4">
      <h2 className="text-lg font-medium mb-4">Información básica</h2>
      
      <div className="flex flex-col space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título del cupón <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            name="title"
            value={coupon.title || ''}
            onChange={handleChange}
            placeholder="Ej: 25% de descuento en tu compra"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-xs text-gray-500">Un título atractivo y descriptivo</p>
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del negocio <span className="text-red-500">*</span>
          </label>
          <input 
            type="text"
            name="businessName"
            value={coupon.businessName || ''}
            onChange={handleChange}
            placeholder="Ej: Mi Tienda"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de descuento <span className="text-red-500">*</span>
            </label>
            <select 
              name="discountType" 
              value={coupon.discountType || 'percentage'}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="percentage">Porcentaje</option>
              <option value="fixed">Monto fijo</option>
              <option value="buyOneGetOne">2x1</option>
              <option value="freeItem">Producto gratis</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor del descuento <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              {(coupon.discountType === 'percentage' || coupon.discountType === 'fixed') && (
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  {coupon.discountType === 'percentage' ? '%' : '$'}
                </span>
              )}
              <input 
                type="text"
                name="discountValue"
                value={coupon.discountValue || ''}
                onChange={handleChange}
                placeholder={
                  coupon.discountType === 'percentage' ? '25' :
                  coupon.discountType === 'fixed' ? '500' :
                  coupon.discountType === 'buyOneGetOne' ? '2x1' :
                  'Producto gratis'
                }
                className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  ${(coupon.discountType === 'percentage' || coupon.discountType === 'fixed') ? 'rounded-r-md' : 'rounded-md'}`}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input 
            type="text"
            name="description"
            value={coupon.description || ''}
            onChange={handleChange}
            placeholder="Descripción breve del cupón"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">Explica brevemente la oferta</p>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;