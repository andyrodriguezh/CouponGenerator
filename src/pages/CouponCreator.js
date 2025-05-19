import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Button, 
  Flex,
  Heading,
  Text,
  VStack,
  Divider,
  Grid, 
  GridItem,
  useToast
} from '@chakra-ui/react';
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
const CouponCreator = () => {  const navigate = useNavigate();
  const toast = useToast();
  
  // Estado para el cupón en edición
  const [coupon, setCoupon] = useState(new Coupon({}));
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Color de fondo - adaptado para Chakra UI v3
  const bgColor = 'gray.50';
  
  // Función para guardar el cupón
  const handleSave = async () => {
    // Validación básica de campos obligatorios    if (!coupon.title || !coupon.businessName || !coupon.discountValue) {
      toast({
        title: 'Completa los campos obligatorios',
        description: 'El título, nombre del negocio y valor del descuento son requeridos',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    setIsSubmitting(true);
      try {
      const result = await createCoupon(coupon);      if (result.success) {
        toast({
          title: 'Cupón creado correctamente',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Redirigir a la página del nuevo cupón
        navigate(`/coupon/${result.data.id}`);      } else {
        throw new Error(result.error || 'Error al crear el cupón');
      }    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Box bg={bgColor} minH="100vh" py={6}>
      <Container maxW="container.xl">
        {/* Cabecera */}
        <Flex justify="space-between" align="center" mb={8}>
          <VStack align="flex-start" spacing={1}>
            <Heading as="h1" size="lg">Crear nuevo cupón</Heading>
            <Text fontSize="sm" color="gray.600">
              Personaliza tu cupón de descuento y compártelo con tus clientes
            </Text>
          </VStack>
          <Button onClick={() => navigate('/')} variant="outline">
            Volver
          </Button>
        </Flex>
        
        <Divider mb={6} />
        
        {/* Editor y preview */}
        <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
          {/* Editor */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              <BasicInformation coupon={coupon} setCoupon={setCoupon} />
              <DesignCustomization coupon={coupon} setCoupon={setCoupon} />
              <TermsAndConditions coupon={coupon} setCoupon={setCoupon} />
              
              {/* Botones de acción */}
              <Flex justify="flex-end" mt={4}>
                <Button 
                  onClick={() => navigate('/')} 
                  mr={4}
                  variant="ghost"
                >
                  Cancelar
                </Button>
                <Button 
                  colorScheme="blue" 
                  onClick={handleSave}
                  isLoading={isSubmitting}
                  loadingText="Guardando..."
                >
                  Guardar cupón
                </Button>
              </Flex>
            </VStack>
          </GridItem>
          
          {/* Vista previa */}
          <GridItem>
            <CouponPreview coupon={coupon} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default CouponCreator;