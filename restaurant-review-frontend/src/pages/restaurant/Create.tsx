import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useSnackbar } from "notistack";
import UserLayout from "../../components/layouts/UserLayout";
import { restaurantAPI } from "../../services/api/restaurant.api";
import { useAuth } from "../../contexts/AuthContext";

interface RestaurantForm {
  name: string;
  address: string;
  contact_info: string;
  email: string;
  menu_photo: File | null;
  cuisine_type: string;
}

const Create = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<RestaurantForm>({
    name: "",
    address: "",
    contact_info: "",
    email: "",
    menu_photo: null,
    cuisine_type: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, menu_photo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("contact_info", formData.contact_info);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("cuisine_type", formData.cuisine_type);
    if (formData.menu_photo) {
      formDataToSubmit.append("menu_photo", formData.menu_photo);
    }
    formDataToSubmit.append("representative", user.id);
    formDataToSubmit.append("is_pending", "true");

    try {
      await restaurantAPI.create(formDataToSubmit);
      enqueueSnackbar("Restaurant created successfully! Your request will be reviewed.", {
        variant: "success",
      });
      navigate(`/restaurants/dashboard`);
    } catch (error) {
      enqueueSnackbar("Failed to create restaurant", { variant: "error" });
    }
  };

  return (
    <UserLayout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Restaurant
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Restaurant Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Cuisine Type"
                  value={formData.cuisine_type}
                  onChange={(e) =>
                    setFormData({ ...formData, cuisine_type: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Contact Information"
                  value={formData.contact_info}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_info: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload Menu Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.menu_photo && (
                  <Typography sx={{ mt: 1 }}>
                    Selected File: {formData.menu_photo.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/restaurant/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Create Restaurant
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </UserLayout>
  );
};

export default Create;
