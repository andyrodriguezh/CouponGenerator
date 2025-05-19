import React, { useState, useEffect /* useRef */ } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  HStack,
  Badge,  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,  Flex,
  Divider,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
  SimpleGrid,
} from '@chakra-ui/react';
import { getCouponById } from '../services/couponService';
import { formatDate, isCouponValid, daysBetween } from '../utils/dateUtils';
import QRGenerator from '../components/QRCode/QRGenerator';
import { generateCouponUrl } from '../services/qrService';

/**
 * Página para ver los detalles y métricas de un cupón
 */
const CouponDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar datos del cupón
  useEffect(() => {
    const fetchCoupon = async () => {
      setLoading(true);
      try {
        const result = await getCouponById(id);
        
        if (result.success && result.data) {
          setCoupon(result.data);
        } else {
          setError(result.error || 'Error al cargar el cupón');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoupon();
  }, [id]);
  
  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  
  // Si hay error, mostrar alerta
  if (error || !coupon) {    return (
      <Container maxW="container.lg" py={10}>        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <AlertDescription>{error || 'Cupón no encontrado'}</AlertDescription>
        </Alert>
        <Button mt={4} onClick={() => navigate('/')}>
          Volver al inicio
        </Button>
      </Container>
    );
  }
  
  // Verificar si el cupón está vigente
  const isValid = isCouponValid(coupon.validFrom, coupon.validUntil);
  const daysRemaining = isValid ? daysBetween(new Date(), coupon.validUntil) : 0;
  
  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="container.lg">
        {/* Cabecera */}
        <Flex justify="space-between" align="center" mb={6}>
          <VStack align="flex-start" spacing={1}>
            <Heading as="h1" size="lg">{coupon.title}</Heading>
            <Text color="gray.600">{coupon.businessName}</Text>
          </VStack>
          <HStack>
            <Button onClick={() => navigate('/')} variant="outline">
              Volver
            </Button>
          </HStack>
        </Flex>
        
        <Divider mb={6} />
        
        <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap={6}>
          {/* Información principal */}
          <GridItem>
            <VStack align="stretch" spacing={6}>
              {/* Detalles del cupón */}
              <Box bg="white" p={6} borderRadius="lg" shadow="md">
                <Heading size="md" mb={4}>Detalles del cupón</Heading>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text fontWeight="bold">Tipo de descuento</Text>
                    <Text>
                      {coupon.discountType === 'percentage' ? 'Porcentaje' : 
                       coupon.discountType === 'fixed' ? 'Monto fijo' :
                       coupon.discountType === 'buyOneGetOne' ? '2x1' : 
                       'Producto gratis'}
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold">Valor</Text>
                    <Text>
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : 
                       coupon.discountType === 'fixed' ? `$${coupon.discountValue}` : 
                       coupon.discountValue}
                    </Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold">Válido desde</Text>
                    <Text>{formatDate(coupon.validFrom)}</Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold">Válido hasta</Text>
                    <Text>{formatDate(coupon.validUntil)}</Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold">Estado</Text>
                    <Badge colorScheme={isValid ? "green" : "red"}>
                      {isValid ? 'Activo' : 'Expirado'}
                    </Badge>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold">Creado</Text>
                    <Text>{formatDate(coupon.createdAt)}</Text>
                  </Box>
                </SimpleGrid>
                
                {coupon.description && (
                  <Box mt={4}>
                    <Text fontWeight="bold">Descripción</Text>
                    <Text>{coupon.description}</Text>
                  </Box>
                )}
                
                {coupon.termsAndConditions && (
                  <Box mt={4}>
                    <Text fontWeight="bold">Términos y condiciones</Text>
                    <Text fontSize="sm">{coupon.termsAndConditions}</Text>
                  </Box>
                )}
                
                {coupon.redirectUrl && (
                  <Box mt={4}>
                    <Text fontWeight="bold">Redirección</Text>
                    <Text>
                      {coupon.redirectType === 'whatsapp' ? 'WhatsApp: ' : 'Web: '}
                      {coupon.redirectUrl}
                    </Text>
                  </Box>
                )}
              </Box>
              
              {/* Métricas del cupón */}
              <Box bg="white" p={6} borderRadius="lg" shadow="md">
                <Heading size="md" mb={4}>Métricas del cupón</Heading>                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
                  <Stat>
                    <StatLabel>Escaneos totales</StatLabel>
                    <StatNumber>{coupon.scanCount || 0}</StatNumber>
                    <StatHelpText>Desde la creación</StatHelpText>
                  </Stat>
                  
                  <Stat>
                    <StatLabel>Estado</StatLabel>
                    <StatNumber>{isValid ? 'Activo' : 'Expirado'}</StatNumber>
                    <StatHelpText>
                      {isValid ? `${daysRemaining} días restantes` : 'Promoción finalizada'}
                    </StatHelpText>
                  </Stat>
                </SimpleGrid>
              </Box>
            </VStack>
          </GridItem>
          
          {/* QR y acciones */}
          <GridItem>
            <VStack spacing={6}>
              <Box bg="white" p={6} borderRadius="lg" shadow="md" w="full">
                <Heading size="md" mb={4} textAlign="center">Código QR</Heading>
                <Center>
                  <QRGenerator
                    value={generateCouponUrl(coupon.id)}
                    title={coupon.title}
                    size={240}
                  />
                </Center>
              </Box>
              
              <Box bg="white" p={6} borderRadius="lg" shadow="md" w="full">
                <Heading size="md" mb={4}>Acciones</Heading>
                <VStack spacing={3}>
                  <Button 
                    colorScheme="blue" 
                    w="full"
                    onClick={() => navigate(`/redeem/${coupon.id}`)}
                  >
                    Ver cupón para clientes
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default CouponDetails;