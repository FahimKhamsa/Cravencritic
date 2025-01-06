import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import UserLayout from '../../components/layouts/UserLayout';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI } from '../../services/api/user.api';
import { restaurantAPI } from '../../services/api/restaurant.api';

interface UserProfile {
  username: string;
  email: string;
  contact_info: string;
  points: number;
  review_count: number;
  pending_reviews: number;
}

const Profile = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [restaurantsCount, setRestaurantsCount] = useState(0);
  const [requestsCount, setRequestsCount] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    email: '',
    contact_info: '',
    points: 0,
    review_count: 0,
    pending_reviews: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  
  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile(user.id);
      setProfile(response.data);
    } catch (error) {
      enqueueSnackbar('Failed to load profile', { variant: 'error' });
    }
  };
  const fetchUserRestaurants = async () => {
    try {
      const data = await restaurantAPI.getUserRestaurants(user.id);
      setRestaurantsCount(data.length);
    } catch (error) {
      enqueueSnackbar('Failed to load restaurants', { variant: 'error' });
    }
  };
  const fetchUserRequests = async () => {
    try {
      const data = await restaurantAPI.getUserRequests(user.id);
      setRequestsCount(data.length);
    } catch (error) {
      enqueueSnackbar('Failed to load requests', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserRestaurants();
    fetchUserRequests();
  }, [user.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userAPI.updateProfile(user.id, profile);
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
      setIsEditing(false);
    } catch (error) {
      enqueueSnackbar('Failed to update profile', { variant: 'error' });
    }
  };

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                User Profile
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={profile.username}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={profile.email}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contact Information"
                      value={profile.contact_info}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, contact_info: e.target.value })}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                      >
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Points Earned
                    </Typography>
                    <Typography variant="h3" color="primary">
                      {profile.points}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Restaurants Posted
                    </Typography>
                    <Typography variant="h3">
                      {restaurantsCount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Pending Requests
                    </Typography>
                    <Typography variant="h3" color="warning.main">
                      {requestsCount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  );
};

export default Profile;