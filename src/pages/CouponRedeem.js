import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  Image, 
  Badge,
  Flex,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Divider,
  Link
} from '@chakra-ui/react';
import { getCouponById, incrementScanCount } from '../services/couponService';
import { formatDate, isCouponValid } from '../utils/dateUtils';
import QRGenerator from '../components/QRCode/QRGenerator';
import { generateCouponUrl } from '../services/qrService';

const CouponRedeem = () => {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scanRegistered, setScanRegistered] = useState(false);
  
  useEffect(() => {
    const fetchCoupon = async () => {
      setLoading(true);
      try {
        // Obtener el cupón
        const result = await getCouponById(id);
        
        if (result.success && result.data) {
          setCoupon(result.data);
          
          // Registrar escaneo si no se ha hecho ya
          if (!scanRegistered) {
            await incrementScanCount(id);
            setScanRegistered(true);
          }
        } else {
          setError(result.error || 'Cupón no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el cupón');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoupon();
  }, [id, scanRegistered]);
  
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  
  if (error || !coupon) {    return (      <Container maxW="md" py={10}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertDescription>{error || 'Cupón no encontrado'}</AlertDescription>
        </Alert>
      </Container>
    );
  }
  
  const isValid = isCouponValid(coupon.validFrom, coupon.validUntil);
  
  return (
    <Box 
      minH="100vh" 
      bg={coupon.primaryColor} 
      color={coupon.textColor}
      pt={8}
      pb={16}
    >
      <Container maxW="md">
        <VStack 
          spacing={4} 
          bg="white" 
          p={6} 
          borderRadius="lg" 
          boxShadow="lg"
        >
          {/* Logo de la empresa */}
          {coupon.logoUrl && (
            <Box w="full" textAlign="center" mb={2}>
              <Image 
                src={coupon.logoUrl} 
                alt={coupon.businessName} 
                maxH="100px" 
                mx="auto"
              />
            </Box>
          )}
          
          {/* Información del descuento */}
          <Badge 
            fontSize="xl" 
            py={2} 
            px={4} 
            colorScheme={isValid ? "green" : "red"}
          >
            {coupon.discountType === 'percentage'
              ? `${coupon.discountValue}% OFF`
              : coupon.discountValue
            }
          </Badge>
          
          <Heading as="h1" size="lg" textAlign="center">
            {coupon.title}
          </Heading>
          
          <Text textAlign="center" fontSize="md">
            {coupon.description}
          </Text>
          
          <Divider />
          
          {/* Validez del cupón */}
          <Flex w="full" justify="space-between" fontSize="sm">
            <Text>Válido hasta:</Text>
            <Text fontWeight="bold">{formatDate(coupon.validUntil)}</Text>
          </Flex>
            {!isValid && (            <Alert status="error" borderRadius="md" size="sm">
              <AlertIcon />
              <AlertDescription>Este cupón ha expirado</AlertDescription>
            </Alert>
          )}
          
          {/* Términos y condiciones */}
          {coupon.termsAndConditions && (
            <Box fontSize="xs" w="full" mt={2}>
              <Text fontWeight="bold">Términos y condiciones:</Text>
              <Text>{coupon.termsAndConditions}</Text>
            </Box>
          )}
          
          {/* Botón de acción */}
          {coupon.redirectUrl && (
            <Button
              w="full"
              colorScheme="green"
              isDisabled={!isValid}
              as={Link}
              href={coupon.redirectUrl}
              isExternal
              mt={4}
            >
              {coupon.redirectType === 'whatsapp' ? 'Contactar por WhatsApp' : 'Visitar sitio web'}
            </Button>
          )}
        </VStack>
        
        {/* Código QR para compartir */}
        <Box mt={8} bg="white" p={6} borderRadius="lg" boxShadow="lg">
          <VStack spacing={4}>
            <Heading as="h3" size="md" textAlign="center">
              Comparte este cupón
            </Heading>
            <QRGenerator
              value={generateCouponUrl(coupon.id)}
              title={coupon.title}
              size={200}
            />
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default CouponRedeem;