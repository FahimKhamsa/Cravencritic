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

interface Admin {
  id: string;
  username: string;
  email: string;
  date_joined: string;
}

const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getAdmins();
      setAdmins(data);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
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
          Administrators
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
                      <TableCell>Email</TableCell>
                      <TableCell>Join Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {admins
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell>{admin.username}</TableCell>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>{admin.date_joined}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={admins.length}
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

export default AdminList;
