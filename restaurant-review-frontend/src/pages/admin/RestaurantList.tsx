import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Box,
} from '@mui/material';
import AdminLayout from '../../components/layouts/AdminLayout';
import BackButton from '../../components/navigation/BackButton';
import {adminAPI} from '../../services/api/admin.api';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  contact_info: string;
  email: string;
  cuisine_type: string;
  representative: string;
}

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <BackButton to="/admin/dashboard/" />
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurants
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Cuisine</TableCell>
                      <TableCell>Representative</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {restaurants
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((restaurant) => (
                        <TableRow key={restaurant.id}>
                          <TableCell>{restaurant.name}</TableCell>
                          <TableCell>{restaurant.address}</TableCell>
                          <TableCell>{restaurant.contact_info}</TableCell>
                          <TableCell>{restaurant.email}</TableCell>
                          <TableCell>{restaurant.cuisine_type}</TableCell>
                          <TableCell>{restaurant.representative}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={restaurants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Paper>
      </Container>
    </AdminLayout>
  );
};

export default RestaurantList;
