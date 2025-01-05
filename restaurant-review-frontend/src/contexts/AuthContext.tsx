import React, { createContext, useContext, useState } from "react";
import { storage } from "../utils/storage";

const AuthContext = createContext<any>(undefined);

const getInitialState = () => {
  const token = storage.getToken();
  const user = storage.getUser();

  return {
    token,
    user,
    isAuthenticated: !!token && !!user,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ user, token, isAuthenticated }, setState] = useState(
    getInitialState()
  );

  const login = ({ token, user }: { token: string; user: any }) => {
    storage.setToken(token);
    storage.setUser(user);
    setState({ token, user, isAuthenticated: true });
  };

  const logout = () => {
    storage.clearAuth();
    setState({ token: null, user: null, isAuthenticated: false });
  };

  const updateUser = (updatedUser: any) => {
    storage.setUser(updatedUser);
    setState((prev) => ({ ...prev, user: updatedUser }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
