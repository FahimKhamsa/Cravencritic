import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminDashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/Dashboard';
import RestaurantRepDashboard from './pages/restaurant/Dashboard';
import RestaurantProfile from './pages/restaurant/Profile';
import RestaurantCreate from './pages/restaurant/Create';
import AllRestaurants from './pages/restaurant/AllRestaurants';
import UserReviews from './pages/user/UserReviews';
import UserProfile from './pages/user/Profile';
import AdminProfile from './pages/admin/Profile';
import RestaurantList from './pages/admin/RestaurantList';
import AdminList from './pages/admin/AdminList';
import UserList from './pages/admin/UserList';
import PendingRequestList from './pages/admin/PendingRequestList';

// Context
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/restaurants" element={<RestaurantList />} />
              <Route path="/admin/admins" element={<AdminList />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/pending-requests" element={<PendingRequestList />} />
              
              {/* User Routes */}
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/reviews" element={<UserReviews />} />
              
              {/* Restaurant Rep Routes */}
              <Route path="/restaurants/dashboard" element={<RestaurantRepDashboard />} />
              <Route path="/restaurants/all" element={<AllRestaurants />} />
              <Route path="/restaurants/:id" element={<RestaurantProfile />} />
              <Route path="/restaurants/create" element={<RestaurantCreate />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;