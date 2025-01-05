import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSnackbar } from "notistack";
import UserLayout from "../../components/layouts/UserLayout";
import { restaurantAPI } from "../../services/api/restaurant.api";
import { reviewAPI } from "../../services/api/review.api";
import { useAuth } from "../../contexts/AuthContext";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  contact_info: string;
  email: string;
  menu_photo: string;
  cuisine_type: string;
  owner_id: string;
}

interface Review {
  id: string;
  user_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRestaurant, setEditedRestaurant] = useState<Restaurant | null>(
    null
  );
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const [restaurantRes, reviewsRes] = await Promise.all([
        restaurantAPI.getOne(id!),
        reviewAPI.getByRestaurant(id!),
      ]);
      setRestaurant(restaurantRes);
      console.log(restaurant);
      setEditedRestaurant(restaurantRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      enqueueSnackbar("Failed to load restaurant data", { variant: "error" });
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await restaurantAPI.update(id!, editedRestaurant!);
      setRestaurant(editedRestaurant);
      setIsEditing(false);
      enqueueSnackbar("Restaurant updated successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to update restaurant", { variant: "error" });
    }
  };

  if (!restaurant) {
    return null;
  }

  const handleReviewSubmit = async () => {
    if (newRating === null) {
      enqueueSnackbar("Please provide a rating", { variant: "warning" });
      return;
    }
    try {
      const data = {
        restaurant: restaurant.id,
        rating: newRating,
        review_text: newReview,
        user: user.id,
        username: user.username,
      };
      await reviewAPI.create(data);
      enqueueSnackbar("Review added successfully", { variant: "success" });
      setNewReview("");
      setNewRating(null);
      setDialogOpen(false);
      fetchData();
    } catch (error) {
      enqueueSnackbar("Failed to add review", { variant: "error" });
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((ac, review) => ac + review.rating, 0) / reviews.length
      : 0;

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h4" component="h1">
                  {restaurant.name}
                </Typography>
                {restaurant.owner_id === user.id && (
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Restaurant
                  </Button>
                )}
              </Box>
              <CardMedia
                component="img"
                height="300"
                image={
                  restaurant.menu_photo ||
                  "https://source.unsplash.com/random?restaurant-menu"
                }
                alt="Menu"
                sx={{ borderRadius: 2, mb: 3 }}
              />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Cuisine Type
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {restaurant.cuisine_type}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {restaurant.address}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Contact
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {restaurant.contact_info}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {restaurant.email}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Reviews
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Rating value={averageRating} precision={0.5} readOnly />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  ({averageRating.toFixed(1)})
                </Typography>
              </Box>
              <List>
                {reviews.map((review) => (
                  <React.Fragment key={review.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle1">
                              {review.user_name}
                            </Typography>
                            <Rating
                              value={review.rating}
                              size="small"
                              readOnly
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {review.review_text}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {new Date(review.created_at).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Statistics
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Total Reviews"
                      secondary={reviews.length}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Average Rating"
                      secondary={`${averageRating.toFixed(1)} / 5.0`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" onClick={() => setDialogOpen(true)}>
                Leave a Review
              </Button>
            </Box>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle>Leave a Review</DialogTitle>
              <DialogContent>
                <Rating
                  value={newRating}
                  precision={1}
                  onChange={(_event, newValue) =>
                    setNewRating(Math.round(newValue || 0))
                  }
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Your Review"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  sx={{ mt: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleReviewSubmit}>Submit</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>

        <Dialog
          open={isEditing}
          onClose={() => setIsEditing(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Restaurant</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Restaurant Name"
                    value={editedRestaurant?.name}
                    onChange={(e) =>
                      setEditedRestaurant({
                        ...editedRestaurant!,
                        name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cuisine Type"
                    value={editedRestaurant?.cuisine_type}
                    onChange={(e) =>
                      setEditedRestaurant({
                        ...editedRestaurant!,
                        cuisine_type: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={editedRestaurant?.address}
                    onChange={(e) =>
                      setEditedRestaurant({
                        ...editedRestaurant!,
                        address: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Information"
                    value={editedRestaurant?.contact_info}
                    onChange={(e) =>
                      setEditedRestaurant({
                        ...editedRestaurant!,
                        contact_info: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={editedRestaurant?.email}
                    onChange={(e) =>
                      setEditedRestaurant({
                        ...editedRestaurant!,
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Menu Photo URL"
                    value={editedRestaurant?.menu_photo}
                    onChange={(e) =>
                      setEditedRestaurant({
                        ...editedRestaurant!,
                        menu_photo: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </UserLayout>
  );
};

export default Profile;
