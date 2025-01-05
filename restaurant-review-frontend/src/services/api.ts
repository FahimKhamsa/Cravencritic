import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = ` ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "An error occurred";
    return Promise.reject({ message });
  }
);

export const authAPI = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post("/login/", credentials);
    return {
      token: response.data.token,
      user: response.data.user,
    };
  },
  register: (userData: any) => api.post("/users/", userData),
  forgotPassword: (email: string) => api.post("/password-reset/", { email }),
};

export const userAPI = {
  getProfile: (id: string) => api.get(`/users/${id}/`),
  updateProfile: (id: string, data: any) => api.put(`/users/${id}/`, data),
};

export const restaurantAPI = {
  getAll: () => api.get("/restaurants/"),
  getOne: (id: string) => api.get(`/restaurants/${id}/`),
  create: (data: any) => api.post("/restaurants/", data),
  update: (id: string, data: any) => api.put(`/restaurants/${id}/`, data),
  delete: (id: string) => api.delete(`/restaurants/${id}/`),
};

export const reviewAPI = {
  getByRestaurant: (restaurantId: string) =>
    api.get(`/reviews/?restaurant_id=${restaurantId}`),
  create: (data: any) => api.post("/reviews/", data),
  update: (id: string, data: any) => api.put(`/reviews/${id}/`, data),
  delete: (id: string) => api.delete(`/reviews/${id}/`),
};

export default api;
