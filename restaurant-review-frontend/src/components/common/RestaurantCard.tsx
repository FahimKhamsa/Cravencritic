import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RestaurantCardProps {
  id: string;
  name: string;
  cuisine_type: string;
  address: string;
  menu_photo: string;
  rating?: number;
  review_count?: number;
}

const RestaurantCard = ({
  id,
  name,
  cuisine_type,
  address,
  menu_photo,
  rating = 0,
  review_count = 0,
}: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={menu_photo || 'https://source.unsplash.com/random?restaurant'}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {cuisine_type}
        </Typography>
        <Typography variant="body2" paragraph>
          {address}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({review_count} reviews)
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate(`/restaurants/${id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;