import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { downloadQRCode, generateQRFilename } from '../../services/qrService';

/**
 * Componente para generar códigos QR para cupones
 */
const QRGenerator = ({ 
  value, 
  title = 'Cupón',
  size = 256,
  bgColor = '#ffffff',
  fgColor = '#000000',
  includeMargin = true,
  level = 'M',
}) => {
  const qrRef = useRef(null);
  
  const handleDownload = async (format) => {
    if (!qrRef.current) return;
    
    try {
      const filename = generateQRFilename(title);
      await downloadQRCode(qrRef.current.querySelector('canvas'), filename, format);
    } catch (error) {
      console.error('Error al descargar QR:', error);
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div ref={qrRef} className="p-4 bg-white rounded-md shadow-md">
        <QRCodeCanvas
          value={value}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
        />
      </div>
      
      <p className="text-sm text-gray-500">
        Escanea este código QR o descárgalo
      </p>
      
      <div className="flex space-x-4">
        <button 
          className="px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-md"
          onClick={() => handleDownload('png')}
        >
          PNG
        </button>
        <button 
          className="px-3 py-1 text-sm border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-md"
          onClick={() => handleDownload('svg')}
        >
          SVG
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;