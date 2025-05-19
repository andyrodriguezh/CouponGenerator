/**
 * Servicio para manejar métricas y estadísticas de cupones
 */

import { formatDate } from '../utils/dateUtils';

/**
 * Organiza los datos de escaneos por día para mostrar en gráficos
 * @param {Array} scans - Array de escaneos con timestamps
 * @param {number} days - Número de días a mostrar
 * @returns {Object} - Datos formateados para gráficos
 */
export const getScansOverTime = (scans = [], days = 7) => {
  // Si no hay escaneos, devolvemos estructura vacía
  if (!scans || scans.length === 0) {
    return {
      labels: [],
      datasets: [{
        label: 'Escaneos',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  }

  // Obtener fechas para los últimos N días
  const dates = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    dates.push({
      date: new Date(date.setHours(0, 0, 0, 0)),
      formatted: formatDate(date),
      count: 0
    });
  }

  // Contar escaneos por día
  scans.forEach(scan => {
    const scanDate = new Date(scan.timestamp);
    const scanDateStart = new Date(scanDate.setHours(0, 0, 0, 0));
    
    const dateEntry = dates.find(d => d.date.getTime() === scanDateStart.getTime());
    if (dateEntry) {
      dateEntry.count++;
    }
  });

  // Formatear datos para Chart.js
  return {
    labels: dates.map(d => d.formatted),
    datasets: [{
      label: 'Escaneos',
      data: dates.map(d => d.count),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };
};

/**
 * Analiza información de dispositivos para generar estadísticas
 * @param {Array} scans - Array de escaneos con información de dispositivo
 * @returns {Object} - Estadísticas de dispositivos
 */
export const getDeviceStats = (scans = []) => {
  if (!scans || scans.length === 0) {
    return {
      total: 0,
      mobile: 0,
      desktop: 0,
      tablet: 0,
      other: 0,
      pieData: {
        labels: ['Móvil', 'Escritorio', 'Tablet', 'Otro'],
        datasets: [{
          data: [0, 0, 0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      }
    };
  }

  // Inicializar contadores
  let mobile = 0;
  let desktop = 0;
  let tablet = 0;
  let other = 0;

  // Contar por tipo de dispositivo
  scans.forEach(scan => {
    if (scan.device) {
      if (scan.device.type === 'mobile') mobile++;
      else if (scan.device.type === 'desktop') desktop++;
      else if (scan.device.type === 'tablet') tablet++;
      else other++;
    } else {
      other++;
    }
  });

  // Calcular total
  const total = scans.length;

  // Datos para gráfico de pastel
  const pieData = {
    labels: ['Móvil', 'Escritorio', 'Tablet', 'Otro'],
    datasets: [{
      data: [mobile, desktop, tablet, other],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  return {
    total,
    mobile,
    desktop,
    tablet,
    other,
    pieData
  };
};

/**
 * Exporta los datos de métricas a formato CSV
 * @param {Array} scans - Array de escaneos
 * @returns {string} - Contenido CSV
 */
export const exportMetricsToCSV = (scans = []) => {
  if (!scans || scans.length === 0) {
    return 'No hay datos para exportar';
  }

  // Encabezados CSV
  const headers = ['ID', 'Fecha', 'Hora', 'Dispositivo', 'Navegador', 'Sistema Operativo'];
  
  // Convertir cada escaneo a línea CSV
  const rows = scans.map(scan => {
    const scanDate = new Date(scan.timestamp);
    const date = formatDate(scanDate);
    const time = scanDate.toLocaleTimeString();
    
    return [
      scan.id || 'N/A',
      date,
      time,
      (scan.device?.type || 'N/A'),
      (scan.device?.browser || 'N/A'),
      (scan.device?.os || 'N/A')
    ].join(',');
  });

  // Unir todo en un string CSV
  return [headers.join(','), ...rows].join('\n');
};