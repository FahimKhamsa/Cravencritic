import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
  Paper,
} from '@mui/material';
import { Restaurant as RestaurantIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, userRole } = useAuth();

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'restaurant_rep':
        return '/restaurant/dashboard';
      default:
        return '/user/dashboard';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <RestaurantIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
            Restaurant Review
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Button
                  component={RouterLink}
                  to={getDashboardLink()}
                  variant="contained"
                  color="primary"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 4,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            Discover & Review Restaurants
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
            Find the best dining experiences in your area
          </Typography>
          {!isAuthenticated && (
            <Box sx={{ mt: 4 }}>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mr: 2 }}
              >
                Get Started
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                color="primary"
                size="large"
              >
                Sign In
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;