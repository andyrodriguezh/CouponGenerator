import React from 'react';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container centerContent maxW="container.md" py={20}>
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="4xl">404</Heading>
        <Heading as="h2" size="xl">Página no encontrada</Heading>
        
        <Text fontSize="lg">
          La página que estás buscando no existe o ha sido movida.
        </Text>
        
        <Box pt={6}>
          <Button
            as={RouterLink}
            to="/"
            colorScheme="blue"
            size="lg"
          >
            Volver al inicio
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default NotFound;