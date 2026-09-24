import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('frolic_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected server error occurred. Please try again.';
    const customError = new Error(message);
    customError.response = error.response;
    customError.errors = error.response?.data?.errors || null;
    customError.status = error.response?.status || 500;
    return Promise.reject(customError);
  }
);

export default apiClient;
