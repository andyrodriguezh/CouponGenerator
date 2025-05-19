import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';

// Configuración de AWS Amplify
// Nota: En producción, estos valores deberían venir de variables de entorno
Amplify.configure({
  // API Gateway
  API: {
    endpoints: [
      {
        name: "couponsApi",
        endpoint: process.env.REACT_APP_API_ENDPOINT || "https://placeholder-api.execute-api.us-east-1.amazonaws.com/dev"
      }
    ]
  },
  // S3 para almacenamiento de imágenes
  Storage: {
    AWSS3: {
      bucket: process.env.REACT_APP_S3_BUCKET || "placeholder-bucket",
      region: process.env.REACT_APP_REGION || "us-east-1"
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
