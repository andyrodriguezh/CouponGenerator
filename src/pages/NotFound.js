import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto max-w-2xl py-20 px-4">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-3xl font-bold">Página no encontrada</h2>
        
        <p className="text-lg">
          La página que estás buscando no existe o ha sido movida.
        </p>
        
        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex px-6 py-3 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;