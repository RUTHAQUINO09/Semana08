import axios from 'axios';
import * as AuthService from '../utils/auth';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token de autenticación a cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = AuthService.getAuthHeader();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401 (No autorizado)
// Si el backend devolviera 401 por token expirado, este sería el
// lugar ideal para implementar la lógica de refresh token.
// Como no hay, simplemente deslogueamos al usuario.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      AuthService.logout();
      window.location.href = '/login'; // Forzar recarga y redirección
    }
    return Promise.reject(error);
  }
);

export default apiClient;