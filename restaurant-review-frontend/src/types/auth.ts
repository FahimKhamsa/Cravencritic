// export interface User {
//     id: string;
//     username: string;
//     email?: string;
//     is_superuser: boolean;
//   }
  
// export interface AuthState {
//     user: User | null;
//     token: string | null;
//     isAuthenticated: boolean;
//   }
  
// export interface LoginCredentials {
//     username: string;
//     password: string;
//   }
  
// export interface LoginResponse {
//     token: string;
//     user: User;
//   }
  
// export interface AuthContextType extends AuthState {
//     login: (response: LoginResponse) => void;
//     logout: () => void;
//     updateUser: (user: User) => void;
//   }