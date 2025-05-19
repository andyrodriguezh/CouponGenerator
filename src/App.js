import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Importación de páginas
import Home from './pages/Home';
import CouponCreator from './pages/CouponCreator';
import CouponDetails from './pages/CouponDetails';
import CouponRedeem from './pages/CouponRedeem';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Box minH="100vh">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CouponCreator />} />
            <Route path="/coupon/:id" element={<CouponDetails />} />
            <Route path="/redeem/:id" element={<CouponRedeem />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
