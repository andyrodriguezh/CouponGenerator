/**
 * Hook personalizado para acceder a los servicios desde componentes React
 */
import { services } from '../services/api/serviceProvider';

// Hook para acceder a los servicios desde componentes React
export const useServices = () => {
  return services;
};

export default useServices;
