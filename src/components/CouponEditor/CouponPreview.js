import React from 'react';
import {
  Box,
  VStack,
  Text,
  Image,
  // Badge, // Commented out unused import
  Divider,
  Heading,
  Center
} from '@chakra-ui/react';
import { formatDate } from '../../utils/dateUtils';

/**
 * Componente para mostrar una vista previa del cupón
 */
const CouponPreview = ({ coupon }) => {
  // Si no hay datos del cupón, mostrar un mensaje
  if (!coupon) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
        <Text>Vista previa no disponible</Text>
      </Box>
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
    <Box 
      position="sticky" 
      top="20px"
      maxW="100%"
    >
      <Heading size="sm" mb={2} ml={2}>Vista previa</Heading>
      
      {/* Contenedor del cupón */}
      <VStack 
        spacing={3}
        w="full"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg="white"
        justify="space-between"
        style={{
          background: coupon.primaryColor || '#3182CE',
        }}
      >
        {/* Parte superior del cupón */}
        <Box 
          w="full" 
          bg="white"
          p={4}
          borderBottomWidth="2px"
          borderBottomColor={coupon.secondaryColor || '#EDF2F7'}
          borderBottomStyle="dashed"
        >
          {/* Logo */}
          {coupon.logoUrl && (
            <Center mb={3}>
              <Image 
                src={coupon.logoUrl} 
                alt={coupon.businessName || 'Logo'} 
                maxH="60px" 
                objectFit="contain"
              />
            </Center>
          )}
          
          {/* Título del negocio */}
          <Text 
            textAlign="center" 
            fontWeight="bold"
            color={coupon.textColor || 'gray.800'}
            fontSize="md"
          >
            {coupon.businessName || 'Nombre del Negocio'}
          </Text>
          
          {/* Valor del descuento */}
          <Text 
            fontSize="3xl" 
            fontWeight="extrabold" 
            textAlign="center"
            color={coupon.textColor || 'gray.800'}
            my={2}
          >
            {formatDiscountValue() || '25% OFF'}
          </Text>
          
          {/* Título del cupón */}
          <Text 
            fontSize="lg" 
            textAlign="center"
            color={coupon.textColor || 'gray.800'}
            fontWeight="medium"
          >
            {coupon.title || 'Título del Cupón'}
          </Text>
          
          {/* Descripción */}
          {coupon.description && (
            <Text 
              fontSize="sm" 
              textAlign="center" 
              mt={1}
              color={coupon.textColor || 'gray.600'}
            >
              {coupon.description}
            </Text>
          )}
        </Box>
        
        {/* Parte inferior del cupón */}
        <Box 
          w="full" 
          p={3}
          bg={coupon.secondaryColor || '#EDF2F7'}
          color={coupon.textColor || 'gray.700'}
        >
          {/* Fechas de validez */}
          <Text fontSize="xs" textAlign="center">
            Válido hasta: {formatDate(coupon.validUntil) || '31/12/2025'}
          </Text>
            {/* Términos y condiciones */}
          {coupon.termsAndConditions && (
            <>
              <Divider my={2} borderColor={`${coupon.textColor}40` || 'gray.300'} />
              <Text fontSize="2xs" textAlign="center">
                {coupon.termsAndConditions}
              </Text>
            </>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default CouponPreview;