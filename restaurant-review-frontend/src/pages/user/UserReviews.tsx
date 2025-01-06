import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/layouts/UserLayout";
import { reviewAPI } from "../../services/api/review.api";
import { useAuth } from "../../contexts/AuthContext";

interface Review {
  id: string;
  restaurant: string;
  review_text: string;
  rating: number;
  created_at: string;
}

const UserReviews = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    try {
      const data = await reviewAPI.getUserReviews(user.id);
      setReviews(data.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user.id]);

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                You haven't written any reviews yet
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/restaurants/all")}
                sx={{ mt: 2 }}
              >
                Explore Restaurants
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={4}>
              {reviews.map((review) => (
                <Grid item key={review.id} xs={12} md={6}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Rating: {review.rating} / 5
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                      >
                        {review.review_text}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        Restaurant: {review.restaurant}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Reviewed on:{" "}
                        {new Date(review.created_at).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() =>
                            navigate(`/restaurants/${review.restaurant}`)
                          }
                        >
                          View Restaurant
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

export default UserReviews;
