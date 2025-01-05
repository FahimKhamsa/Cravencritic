import api from './axios-config';

// export interface Review {
//   id: string;
//   restaurant_id: string;
//   review_text: string;
//   rating: number;
//   user_id?: string;
//   created_at?: string;
//   updated_at?: string;
// }

// export const reviewAPI = {
//   getByRestaurant: async (restaurantId: string): Promise<Review[]> => {
//     const response = await api.get(`/reviews/?restaurant_id=${restaurantId}`);
//     return response.data;
//   },
  
//   create: async (data: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> => {
//     const response = await api.post('/reviews/', data);
//     return response.data;
//   },
  
//   update: async (id: string, data: Partial<Review>): Promise<Review> => {
//     const response = await api.put(`/reviews/${id}/`, data);
//     return response.data;
//   },
  
//   delete: async (id: string): Promise<void> => {
//     await api.delete(`/reviews/${id}/`);
//   },
// };

export const reviewAPI = {
  getByRestaurant: (restaurantId: string) =>
    api.get(`/reviews/?restaurant_id=${restaurantId}`),
  create: (data: any) => api.post("/reviews/", data),
  update: (id: string, data: any) => api.put(`/reviews/${id}/`, data),
  delete: (id: string) => api.delete(`/reviews/${id}/`),
};