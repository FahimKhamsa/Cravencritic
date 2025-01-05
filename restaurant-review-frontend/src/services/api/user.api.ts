import api from './axios-config';
// import { User } from '../../types/auth';

// export const userAPI = {
//   getProfile: async (id: string): Promise<User> => {
//     const response = await api.get(`/users/${id}/`);
//     return response.data;
//   },
  
//   updateProfile: async (id: string, data: Partial<User>): Promise<User> => {
//     const response = await api.put(`/users/${id}/`, data);
//     return response.data;
//   },
// };

export const userAPI = {
  getProfile: (id: string) => api.get(`/users/${id}/`),
  updateProfile: (id: string, data: any) => api.patch(`/users/${id}/`, data),
};