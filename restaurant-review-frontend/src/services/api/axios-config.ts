import axios from 'axios';
import { storage } from '../../utils/storage';

const API_BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = 
      error.response?.data?.detail ||
      error.response?.data?.message ||
      'An error occurred';
    return Promise.reject({ message });
  }
);

export default axiosInstance;