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
  TextField,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../components/layouts/UserLayout';
import { restaurantAPI } from '../../services/api/restaurant.api';

interface Restaurant {
  id: string;
  name: string;
  cuisine_type: string;
  address: string;
  menu_photo: string;
  is_pending: boolean;
}

const AllRestaurants = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantAPI.getAll();
        setRestaurants(data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      !restaurant.is_pending &&
      (restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Restaurants
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
          Search and Explore Your Favorite Restaurants
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, cuisine, or address"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredRestaurants.length > 0 ? (
          <Grid container spacing={4}>
            {filteredRestaurants.map((restaurant) => (
              <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={restaurant.menu_photo || 'https://source.unsplash.com/random?restaurant'}
                    alt={restaurant.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {restaurant.name}
                    </Typography>
                    <Typography>{restaurant.cuisine_type}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.address}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
            No restaurants found matching your search.
          </Typography>
        )}
      </Container>
    </UserLayout>
  );
};

export default AllRestaurants;
