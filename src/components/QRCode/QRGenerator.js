import React, { useRef } from 'react';
import { Box, Button, HStack, VStack, Text } from '@chakra-ui/react';
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
    <VStack spacing={4} align="center">
      <Box ref={qrRef} p={4} bg="white" borderRadius="md" boxShadow="md">
        <QRCodeCanvas
          value={value}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
        />
      </Box>
      
      <Text fontSize="sm" color="gray.500">
        Escanea este código QR o descárgalo
      </Text>
      
      <HStack spacing={4}>
        <Button 
          colorScheme="blue" 
          onClick={() => handleDownload('png')}
          size="sm"
        >
          PNG
        </Button>
        <Button 
          colorScheme="blue" 
          variant="outline"
          onClick={() => handleDownload('svg')}
          size="sm"
        >
          SVG
        </Button>
      </HStack>
    </VStack>
  );
};

export default QRGenerator;