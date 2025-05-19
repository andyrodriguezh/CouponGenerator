import React from 'react';
import {
  Field,
  FieldLabel,
  FieldHelperText,
  Box,
  VStack,
  Heading,
  Input,
  HStack,
  // Button, // Commented out unused import
  Text
} from '@chakra-ui/react';
import { SketchPicker } from 'react-color';

/**
 * Componente para personalizar el diseño del cupón
 */
const DesignCustomization = ({ coupon, setCoupon }) => {
  // En Chakra UI v3 ya no se usa useColorModeValue, usamos directamente el color
  const bgColor = 'white';
  
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
    <Box p={4} borderWidth="1px" borderRadius="lg" bg={bgColor} mb={4}>
      <Heading size="md" mb={4}>Personalización del diseño</Heading>
      
      <VStack spacing={4} align="stretch">        {/* Carga de logo */}
        <Field>
          <FieldLabel>Logo de la empresa</FieldLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ paddingTop: '4px' }}
          />
          <FieldHelperText>
            Imagen PNG o JPG, tamaño recomendado 300x150px
          </FieldHelperText>
          
          {coupon.logoUrl && (
            <Box mt={2} p={2} borderWidth="1px" borderRadius="md" width="fit-content">
              <img 
                src={coupon.logoUrl} 
                alt="Logo preview" 
                style={{ maxHeight: '80px' }} 
              />
            </Box>
          )}
        </Field>
        
        {/* Selección de colores */}
        <Box>
          <Text fontWeight="medium" mb={2}>
            Colores del cupón
          </Text>
          
          <HStack spacing={8} align="flex-start" flexWrap="wrap">
            {/* Color primario */}
            <Box>
              <Text fontSize="sm" mb={1}>Color primario</Text>
              <Box mb={2} width="100px">
                <Box 
                  height="24px" 
                  bg={coupon.primaryColor} 
                  borderRadius="md" 
                  borderWidth="1px"
                  borderColor="gray.300"
                />
              </Box>
              <SketchPicker 
                color={coupon.primaryColor}
                onChange={(color) => handleColorChange('primaryColor', color)}
                disableAlpha={true}
                width="200px"
              />
            </Box>
            
            {/* Color secundario */}
            <Box>
              <Text fontSize="sm" mb={1}>Color secundario</Text>
              <Box mb={2} width="100px">
                <Box 
                  height="24px" 
                  bg={coupon.secondaryColor} 
                  borderRadius="md" 
                  borderWidth="1px"
                  borderColor="gray.300"
                />
              </Box>
              <SketchPicker 
                color={coupon.secondaryColor}
                onChange={(color) => handleColorChange('secondaryColor', color)}
                disableAlpha={true}
                width="200px"
              />
            </Box>
            
            {/* Color de texto */}
            <Box>
              <Text fontSize="sm" mb={1}>Color de texto</Text>
              <Box mb={2} width="100px">
                <Box 
                  height="24px" 
                  bg={coupon.textColor} 
                  borderRadius="md" 
                  borderWidth="1px"
                  borderColor="gray.300"
                />
              </Box>
              <SketchPicker 
                color={coupon.textColor}
                onChange={(color) => handleColorChange('textColor', color)}
                disableAlpha={true}
                width="200px"
              />
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default DesignCustomization;