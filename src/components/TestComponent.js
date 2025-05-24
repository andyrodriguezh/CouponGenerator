import React from 'react';

const TestComponent = () => {
  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary-600 mb-4">
          Prueba de Tailwind CSS
        </h2>
        <p className="text-gray-700 mb-4">
          Este componente de prueba utiliza clases de Tailwind CSS para comprobar que la migración
          desde Chakra UI se ha realizado correctamente.
        </p>
        <div className="flex space-x-4 mt-6">
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded">
            Botón Primario
          </button>
          <button className="bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-2 px-4 rounded">
            Botón Secundario
          </button>
        </div>
        <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded-md text-yellow-800">
          <p className="font-medium">Nota:</p>
          <p className="text-sm">Si puedes ver este componente con los estilos aplicados, significa que Tailwind CSS está funcionando correctamente.</p>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
