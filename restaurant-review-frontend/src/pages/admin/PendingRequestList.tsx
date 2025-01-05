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
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import AdminLayout from '../../components/layouts/AdminLayout';
import BackButton from '../../components/navigation/BackButton';
import { adminAPI } from '../../services/api/admin.api'; 
import { restaurantAPI } from '../../services/api/restaurant.api';

interface PendingRequest {
  id: string;
  name: string;
  address: string;
  contact_info: string;
  email: string;
  cuisine_type: string;
  representative: string;
}

const PendingRequestList = () => {
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  
  const fetchPendingRequests = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getPendingRestaurants(); 
      setPendingRequests(data);
    } catch (error) {
      console.error('Failed to fetch pending requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApprove = async (id: string) => {
    console.log(`Approve request ID: ${id}`);
    await restaurantAPI.update(id, { is_pending: 0 });
    fetchPendingRequests();
  };

  const handleReject = async (id: string) => {
    console.log(`Reject request ID: ${id}`);
    await restaurantAPI.delete(id);
    fetchPendingRequests();
  };

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <BackButton to="/admin/dashboard/" />
        <Typography variant="h4" component="h1" gutterBottom>
          Pending Requests
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
                    {pendingRequests
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.name}</TableCell>
                          <TableCell>{request.address}</TableCell>
                          <TableCell>{request.contact_info}</TableCell>
                          <TableCell>{request.email}</TableCell>
                          <TableCell>{request.cuisine_type}</TableCell>
                          <TableCell>{request.representative}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={() => handleApprove(request.id)}
                              sx={{ mr: 1 }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => handleReject(request.id)}
                            >
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pendingRequests.length}
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

export default PendingRequestList;
