import React, { useState } from 'react';
import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { reviewAPI, Review } from '../../services/api/review.api';

interface ReviewFormProps {
  restaurantId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ restaurantId, onReviewSubmitted }: ReviewFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      enqueueSnackbar('Please provide a rating', { variant: 'warning' });
      return;
    }

    const reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'> = {
      restaurant_id: restaurantId,
      review_text: reviewText,
      rating: rating as number, // Rating is nullable; ensure it’s not null here
    };

    try {
      await reviewAPI.create(reviewData);
      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
      setRating(0);
      setReviewText('');
      onReviewSubmitted(); // Notify parent component of the new review
    } catch (error) {
      enqueueSnackbar('Failed to submit review', { variant: 'error' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography component="legend">Your Rating</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        size="large"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Your Review"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" fullWidth>
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
