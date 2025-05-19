import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  VStack,
  Heading,
  InputGroup,
  InputLeftAddon,
  Stack,
  Box
} from '@chakra-ui/react';

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
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" mb={4}>
      <Heading size="md" mb={4}>Información básica</Heading>
      
      <VStack spacing={4} align="stretch">        <FormControl isRequired>
          <FormLabel>Título del cupón</FormLabel>
          <Input 
            name="title"
            value={coupon.title || ''}
            onChange={handleChange}
            placeholder="Ej: 25% de descuento en tu compra"
          />
          <FormHelperText>Un título atractivo y descriptivo</FormHelperText>
        </FormControl>
          <FormControl isRequired>
          <FormLabel>Nombre del negocio</FormLabel>
          <Input 
            name="businessName"
            value={coupon.businessName || ''}
            onChange={handleChange}
            placeholder="Ej: Mi Tienda"
          />
        </FormControl>
        
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>          <FormControl isRequired>
            <FormLabel>Tipo de descuento</FormLabel>
            <Select 
              name="discountType" 
              value={coupon.discountType || 'percentage'}
              onChange={handleChange}
            >
              <option value="percentage">Porcentaje</option>
              <option value="fixed">Monto fijo</option>
              <option value="buyOneGetOne">2x1</option>
              <option value="freeItem">Producto gratis</option>
            </Select>
          </FormControl>
            <FormControl isRequired>
            <FormLabel>Valor del descuento</FormLabel>
            <InputGroup>              {coupon.discountType === 'percentage' && <InputLeftAddon>%</InputLeftAddon>}
              {coupon.discountType === 'fixed' && <InputLeftAddon>$</InputLeftAddon>}
              <Input 
                name="discountValue"
                value={coupon.discountValue || ''}
                onChange={handleChange}
                placeholder={
                  coupon.discountType === 'percentage' ? '25' :
                  coupon.discountType === 'fixed' ? '500' :
                  coupon.discountType === 'buyOneGetOne' ? '2x1' :
                  'Producto gratis'
                }
              />
            </InputGroup>
          </FormControl>
        </Stack>
          <FormControl>
          <FormLabel>Descripción</FormLabel>
          <Input 
            name="description"
            value={coupon.description || ''}
            onChange={handleChange}
            placeholder="Descripción breve del cupón"
          />
          <FormHelperText>Explica brevemente la oferta</FormHelperText>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default BasicInformation;