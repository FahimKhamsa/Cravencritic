const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
  } as const;
  
  export const storage = {
    getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),
    setToken: (token: string) => localStorage.setItem(STORAGE_KEYS.TOKEN, token),
    removeToken: () => localStorage.removeItem(STORAGE_KEYS.TOKEN),
    
    getUser: () => {
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  
      // Check if the stored value is valid JSON
      if (!userStr) {
        return null; // If there's no user data, return null
      }
  
      try {
        return JSON.parse(userStr); // Attempt to parse the user data
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null; // Return null if parsing fails
      }
    },
    setUser: (user: any) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
    removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),
    
    clearAuth: () => {
      storage.removeToken();
      storage.removeUser();
    }
  };