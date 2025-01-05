import api from './axios-config';

export interface DashboardStats {
  totalRestaurants: number;
  totalAdmins: number;
  totalUsers: number;
  pendingRequests: number;
}

export const adminAPI = {
  getAllUsers: async (): Promise<any> => {
    const response = await api.get("/users/");
    return response.data;
  },
  getUsers: async (): Promise<any> => {
    const response = await adminAPI.getAllUsers();
    return response.filter((user: any) => user.is_superuser === false);
  },
  getAdmins: async (): Promise<any> => {
    const response = await adminAPI.getAllUsers();
    return response.filter((user: any) => user.is_superuser === true);
  },
  getAllRestaurants: async (): Promise<any> => {
    const response = await api.get("/restaurants/");
    return response.data;
  },
  getRestaurants: async (): Promise<any> => {
    const response = await adminAPI.getAllRestaurants();
    return response.filter((restaurant: any) => restaurant.is_pending === false);
  },
  getPendingRestaurants: async (): Promise<any> => {
    const response = await adminAPI.getAllRestaurants();
    return response.filter((restaurant: any) => restaurant.is_pending === true);
  },
  getStats: async (): Promise<DashboardStats> => {
    const users = await adminAPI.getUsers();
    const admins = await adminAPI.getAdmins();
    const restaurants = await adminAPI.getRestaurants();
    const pendingRestaurants = await adminAPI.getPendingRestaurants();
    return {
      totalRestaurants: restaurants.length,
      totalAdmins: admins.length,
      totalUsers: users.length,
      pendingRequests: pendingRestaurants.length,
    };
  },
};
