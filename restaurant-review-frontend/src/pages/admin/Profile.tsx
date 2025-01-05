import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from '../../components/layouts/AdminLayout';
import { userAPI } from '../../services/api/user.api';

interface AdminProfile {
  username: string;
  email: string;
  contact_info: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [profile, setProfile] = useState<AdminProfile>({
    username: '',
    email: '',
    contact_info: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile(user.id);
        setProfile(response.data);
      } catch (error) {
        enqueueSnackbar('Failed to load profile', { variant: 'error' });
      }
    };

    fetchProfile();
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
    <AdminLayout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Profile
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
      </Container>
    </AdminLayout>
  );
};

export default Profile;