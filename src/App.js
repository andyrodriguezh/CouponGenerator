import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Importación de páginas
import Home from './pages/Home';
import CouponCreator from './pages/CouponCreator';
import CouponDetails from './pages/CouponDetails';
import CouponRedeem from './pages/CouponRedeem';
import NotFound from './pages/NotFound';
// Componente de prueba para Tailwind CSS
import TestComponent from './components/TestComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Componente de prueba para verificar que Tailwind CSS funcione correctamente */}
        <div className="pt-4">
          <TestComponent />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CouponCreator />} />
          <Route path="/coupon/:id" element={<CouponDetails />} />
          <Route path="/redeem/:id" element={<CouponRedeem />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
