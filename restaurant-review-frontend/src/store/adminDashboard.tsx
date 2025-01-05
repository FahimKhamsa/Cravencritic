import { create } from 'zustand';

interface AdminDashboardState {
  stats: {
    totalRestaurants: number;
    totalAdmins: number;
    totalUsers: number;
    pendingRequests: number;
  };
  setStats: (stats: AdminDashboardState['stats']) => void;
}

export const useAdminDashboard = create<AdminDashboardState>((set) => ({
  stats: {
    totalRestaurants: 0,
    totalAdmins: 0,
    totalUsers: 0,
    pendingRequests: 0,
  },
  setStats: (stats) => set({ stats }),
}));