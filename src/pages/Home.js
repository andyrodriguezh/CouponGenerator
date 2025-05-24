import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, isCouponValid } from '../utils/dateUtils';
import { listCoupons } from '../services/couponService';

const Home = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar lista de cupones al cargar la página  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      try {
        // Para la prueba, simplemente establecemos un estado simulado sin hacer la llamada a la API
        setCoupons([
          {
            id: 'test1',
            title: 'Cupón de prueba 1',
            discountType: 'percentage',
            discountValue: 25,
            validFrom: new Date(),
            validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días en el futuro
            scanCount: 12,
            businessName: 'Tienda de Prueba'
          },
          {
            id: 'test2',
            title: 'Cupón de prueba 2',
            discountType: 'fixed',
            discountValue: 1000,
            validFrom: new Date(),
            validUntil: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días en el pasado (expirado)
            scanCount: 5,
            businessName: 'Tienda de Prueba'
          }
        ]);
        setLoading(false);
      } catch (err) {
        setError('Error al conectar con el servidor');
        setLoading(false);
      }
    };
    
    fetchCoupons();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col space-y-8">
          {/* Cabecera */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">QR Coupon Generator</h1>
            <Link 
              to="/create"
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm"
            >
              Crear Cupón
            </Link>
          </div>

          {/* Mensajes de estado */}
          {error && (
            <div className="flex p-4 bg-red-100 border-l-4 border-red-500 rounded-md">
              <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {/* Contenido principal */}
          <div 
            className="bg-white shadow-md rounded-md overflow-hidden border border-gray-200"
          >
            <h2 className="text-lg font-medium p-4 border-b border-gray-200">
              Cupones Emitidos
            </h2>
            
            {/* Lista de cupones */}
            {loading ? (
              <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : coupons.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-lg mb-6">
                  No hay cupones disponibles. ¡Crea tu primer cupón!
                </p>
                <Link 
                  to="/create"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md shadow-sm"
                >
                  Crear Cupón
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descuento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Válido Hasta</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Escaneos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {coupons.map(coupon => (
                      <tr key={coupon.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{coupon.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {coupon.discountType === 'percentage' 
                            ? `${coupon.discountValue}%` 
                            : coupon.discountValue
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatDate(coupon.validUntil)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{coupon.scanCount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isCouponValid(coupon.validFrom, coupon.validUntil) ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Activo
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Expirado
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link
                              to={`/coupon/${coupon.id}`}
                              className="px-3 py-1 border border-primary-600 text-primary-600 hover:bg-primary-50 rounded-md text-sm"
                            >
                              Ver
                            </Link>
                            <Link
                              to={`/redeem/${coupon.id}`}
                              className="px-3 py-1 border border-secondary-600 text-secondary-600 hover:bg-secondary-50 rounded-md text-sm"
                            >
                              QR
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;