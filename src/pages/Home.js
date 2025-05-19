import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Flex,
  Heading, 
  Table,
  TableHeader,
  TableColumnHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
  VStack,
  HStack,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate, isCouponValid } from '../utils/dateUtils';
import { listCoupons } from '../services/couponService';

const Home = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // Color para el fondo de la página - adaptado para Chakra UI v3
  const bgColor = 'gray.50';
  
  // Cargar lista de cupones al cargar la página
  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        const result = await listCoupons();
        if (result.success) {
          setCoupons(result.data || []);
        } else {
          setError(result.error || 'Error al cargar cupones');
        }
      } catch (err) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoupons();
  }, []);
  
  return (
    <Box bg={bgColor} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Cabecera */}
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="xl">QR Coupon Generator</Heading>
            <Button 
              as={RouterLink}
              to="/create"
              colorScheme="blue" 
              size="lg"
            >
              Crear Cupón
            </Button>
          </Flex>
            {/* Mensajes de estado */}
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Contenido principal */}
          <Box 
            bg="white" 
            shadow="md" 
            rounded="md" 
            overflow="hidden"
            borderWidth="1px"
          >
            <Heading size="md" p={4} borderBottomWidth="1px">
              Cupones Emitidos
            </Heading>
            
            {/* Lista de cupones */}
            {loading ? (
              <Flex justify="center" align="center" p={10}>
                <Spinner size="xl" />
              </Flex>
            ) : coupons.length === 0 ? (
              <Box p={10} textAlign="center">
                <Text fontSize="lg" mb={6}>
                  No hay cupones disponibles. ¡Crea tu primer cupón!
                </Text>
                <Button 
                  as={RouterLink}
                  to="/create"
                  colorScheme="blue"
                >
                  Crear Cupón
                </Button>
              </Box>
            ) : (              <Table variant="simple">
                <TableHeader>
                  <TableRow>
                    <TableColumnHeader>Título</TableColumnHeader>
                    <TableColumnHeader>Descuento</TableColumnHeader>
                    <TableColumnHeader>Válido Hasta</TableColumnHeader>
                    <TableColumnHeader>Escaneos</TableColumnHeader>
                    <TableColumnHeader>Estado</TableColumnHeader>
                    <TableColumnHeader>Acciones</TableColumnHeader>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map(coupon => (
                    <TableRow key={coupon.id}>
                      <TableCell>{coupon.title}</TableCell>
                      <TableCell>
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}%` 
                          : coupon.discountValue
                        }
                      </TableCell>
                      <TableCell>{formatDate(coupon.validUntil)}</TableCell>
                      <TableCell>{coupon.scanCount}</TableCell>
                      <TableCell>
                        {isCouponValid(coupon.validFrom, coupon.validUntil) ? (
                          <Badge colorScheme="green">Activo</Badge>
                        ) : (
                          <Badge colorScheme="red">Expirado</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <HStack spacing={2}>
                          <Button
                            as={RouterLink}
                            to={`/coupon/${coupon.id}`}
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                          >
                            Ver
                          </Button>
                          <Button
                            as={RouterLink}
                            to={`/redeem/${coupon.id}`}
                            size="sm"
                            colorScheme="green"
                            variant="outline"
                          >                            QR
                          </Button>
                        </HStack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;