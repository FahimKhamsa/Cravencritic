import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  SupervisorAccount as AdminIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";
import AdminLayout from "../../components/layouts/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import { adminAPI, DashboardStats } from "../../services/api/admin.api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalRestaurants: 0,
    totalAdmins: 0,
    totalUsers: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Restaurants",
      value: stats.totalRestaurants,
      icon: RestaurantIcon,
      path: "/admin/restaurants"
    },
    {
      title: "Total Admins",
      value: stats.totalAdmins,
      icon: AdminIcon,
      path: "/admin/admins"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: PersonIcon,
      path: "/admin/users"
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: PendingIcon,
      path: "/admin/pending-requests"
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {statCards.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.title}>
              <StatCard
                title={card.title}
                value={card.value}
                icon={card.icon}
                onClick={() => navigate(card.path)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
