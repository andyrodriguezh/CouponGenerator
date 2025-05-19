import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Box,
  VStack,
  Heading,
  Select,
  InputGroup,
  InputLeftAddon,
  Stack
} from '@chakra-ui/react';
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
    <Box p={4} borderWidth="1px" borderRadius="lg" bg="white" mb={4}>
      <Heading size="md" mb={4}>Términos y Validez</Heading>
        <VStack spacing={4} align="stretch">
        {/* Fechas de validez */}
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Field isRequired>
            <FieldLabel>Válido desde</FieldLabel>
            <Input 
              type="date"
              name="validFrom"
              min={today}
              value={coupon.validFrom ? formatDate(coupon.validFrom, 'yyyy-MM-dd') : today}
              onChange={handleDateChange}
            />
          </Field>
          
          <Field isRequired>
            <FieldLabel>Válido hasta</FieldLabel>
            <Input 
              type="date"
              name="validUntil"
              min={today}
              value={formatDate(coupon.validUntil, 'yyyy-MM-dd')}
              onChange={handleDateChange}
            />
          </Field>
        </Stack>
        
        {/* Términos y condiciones */}
        <Field>
          <FieldLabel>Términos y condiciones</FieldLabel>
          <Textarea 
            name="termsAndConditions"
            value={coupon.termsAndConditions || ''}
            onChange={handleChange}
            placeholder="Ej: No válido con otras promociones. Límite un cupón por persona."
            rows={4}
          />
          <FieldHelperText>
            Especifica cualquier restricción o condición para el uso del cupón
          </FieldHelperText>
        </Field>
        
        {/* Redirección */}
        <Field>
          <FieldLabel>Tipo de redirección</FieldLabel>
          <Select 
            name="redirectType" 
            value={coupon.redirectType || 'web'}
            onChange={handleChange}
          >
            <option value="web">Página web</option>
            <option value="whatsapp">WhatsApp</option>
          </Select>
        </Field>
        
        <Field>
          <FieldLabel>URL o número de WhatsApp</FieldLabel>
          <InputGroup>
            {coupon.redirectType === 'whatsapp' && (
              <InputAddon>+</InputAddon>
            )}
            <Input 
              name="redirectUrl"
              value={coupon.redirectUrl || ''}
              onChange={handleChange}
              placeholder={
                coupon.redirectType === 'web' 
                  ? 'https://mitienda.com/promociones' 
                  : '5491122334455'
              }
            />
          </InputGroup>
          <FieldHelperText>
            {coupon.redirectType === 'web' 
              ? 'URL completa incluyendo https://' 
              : 'Número de teléfono sin espacios ni símbolos'}
          </FieldHelperText>
        </Field>
      </VStack>
    </Box>
  );
};

export default TermsAndConditions;