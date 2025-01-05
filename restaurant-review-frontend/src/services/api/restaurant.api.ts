import api from './axios-config';

export const restaurantAPI = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get("/restaurants/");
    return response.data;
  },
  getUserRestaurants: async (userId: string): Promise<any[]> => {
    const allRestaurants = await restaurantAPI.getAll();
    return allRestaurants.filter((restaurant: any) => restaurant.representative === userId);
  },
  getOne: async (id: string): Promise<any> => {
    const response = await api.get(`/restaurants/${id}/`);
    return response.data;
  },
  create: async (data: any): Promise<any> => {
    const response = await api.post("/restaurants/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  update: async (id: string, data: any): Promise<any> => {
    const response = await api.patch(`/restaurants/${id}/`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/restaurants/${id}/`);
  },
};


// export interface Restaurant {
//   id: string;
//   name: string;
//   address: string;
//   contact_info: string;
//   email: string;
//   cuisine_type: string;
//   menu_photo: string;
//   created_at?: string;
//   updated_at?: string;
// }

// export const restaurantAPI = {
//   getAll: async (): Promise<Restaurant[]> => {
//     const response = await api.get('/restaurants/');
//     return response.data;
//   },
  
//   getOne: async (id: string): Promise<Restaurant> => {
//     const response = await api.get(`/restaurants/${id}/`);
//     return response.data;
//   },
  
//   create: async (data: Omit<Restaurant, 'id'>): Promise<Restaurant> => {
//     const response = await api.post('/restaurants/', data);
//     return response.data;
//   },
  
//   update: async (id: string, data: Partial<Restaurant>): Promise<Restaurant> => {
//     const response = await api.put(`/restaurants/${id}/`, data);
//     return response.data;
//   },
  
//   delete: async (id: string): Promise<void> => {
//     await api.delete(`/restaurants/${id}/`);
//   },
// };