import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../components/layouts/UserLayout';
import { restaurantAPI } from '../../services/api/restaurant.api';
import { useAuth } from '../../contexts/AuthContext';

interface Restaurant {
  id: string;
  name: string;
  cuisine_type: string;
  address: string;
  menu_photo: string;
  total_reviews: number;
  average_rating: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  
  const fetchRestaurants = async () => {
    try {
      const data = await restaurantAPI.getUserRestaurants(user.id);
      setRestaurants(data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [user.id]);

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Restaurants
          </Typography>
          {restaurants.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                You haven't created any restaurants yet
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/restaurants/create')}
                sx={{ mt: 2 }}
              >
                Create Your First Restaurant
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={4}>
              {restaurants.map((restaurant) => (
                <Grid item key={restaurant.id} xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={restaurant.menu_photo || 'https://source.unsplash.com/random?restaurant'}
                      alt={restaurant.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {restaurant.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" gutterBottom>
                        {restaurant.cuisine_type}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {restaurant.address}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Total Reviews</Typography>
                          <Typography variant="h6">{restaurant.total_reviews}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Average Rating</Typography>
                          <Typography variant="h6">
                            {restaurant.average_rating} / 5.0
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                        >
                          Manage Restaurant
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </UserLayout>
  );
};

export default Dashboard;