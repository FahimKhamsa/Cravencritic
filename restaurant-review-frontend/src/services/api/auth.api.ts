// import { LoginCredentials, LoginResponse } from '../../types/auth';
import api from "./axios-config";

// export const authAPI = {
//   login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
//     const response = await api.post('/login/', credentials);
//     return response.data;
//   },

//   register: async (userData: any) => {
//     const response = await api.post('/users/', userData);
//     return response.data;
//   },

//   forgotPassword: async (email: string) => {
//     const response = await api.post('/password-reset/', { email });
//     return response.data;
//   },
// };

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
