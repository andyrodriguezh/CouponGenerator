import React from 'react';
import { SketchPicker } from 'react-color';

/**
 * Componente para personalizar el diseño del cupón
 */
const DesignCustomization = ({ coupon, setCoupon }) => {
  
  // Manejador para cargar el logo
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Normalmente aquí subiríamos el archivo a AWS S3 o similar
      // Por ahora, usaremos una URL local temporal
      const imageUrl = URL.createObjectURL(file);
      
      setCoupon(prevCoupon => ({
        ...prevCoupon,
        logoUrl: imageUrl,
        _logoFile: file // Guardar el archivo para luego subirlo
      }));
    }
  };
  
  // Manejador para cambios de color
  const handleColorChange = (colorType, color) => {
    setCoupon(prevCoupon => ({
      ...prevCoupon,
      [colorType]: color.hex
    }));
  };
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white mb-4">
      <h2 className="text-lg font-medium mb-4">Personalización del diseño</h2>
      
      <div className="flex flex-col space-y-4">
        {/* Carga de logo */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo de la empresa
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Imagen PNG o JPG, tamaño recomendado 300x150px
          </p>
          
          {coupon.logoUrl && (
            <div className="mt-2 p-2 border border-gray-200 rounded-md inline-block">
              <img 
                src={coupon.logoUrl} 
                alt="Logo preview" 
                className="max-h-20"
              />
            </div>
          )}
        </div>
        
        {/* Selección de colores */}
        <div>
          <p className="font-medium mb-2">
            Colores del cupón
          </p>
          
          <div className="flex flex-wrap gap-8">
            {/* Color primario */}
            <div>
              <p className="text-sm mb-1">Color primario</p>
              <div className="mb-2 w-24">
                <div 
                  className="h-6 rounded-md border border-gray-300"
                  style={{ backgroundColor: coupon.primaryColor }}
                />
              </div>
              <SketchPicker 
                color={coupon.primaryColor}
                onChange={(color) => handleColorChange('primaryColor', color)}
                disableAlpha={true}
                width="200px"
              />
            </div>
            
            {/* Color secundario */}
            <div>
              <p className="text-sm mb-1">Color secundario</p>
              <div className="mb-2 w-24">
                <div 
                  className="h-6 rounded-md border border-gray-300" 
                  style={{ backgroundColor: coupon.secondaryColor }}
                />
              </div>
              <SketchPicker 
                color={coupon.secondaryColor}
                onChange={(color) => handleColorChange('secondaryColor', color)}
                disableAlpha={true}
                width="200px"
              />
            </div>
            
            {/* Color de texto */}
            <div>
              <p className="text-sm mb-1">Color de texto</p>
              <div className="mb-2 w-24">
                <div 
                  className="h-6 rounded-md border border-gray-300"
                  style={{ backgroundColor: coupon.textColor }}
                />
              </div>
              <SketchPicker 
                color={coupon.textColor}
                onChange={(color) => handleColorChange('textColor', color)}
                disableAlpha={true}
                width="200px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCustomization;