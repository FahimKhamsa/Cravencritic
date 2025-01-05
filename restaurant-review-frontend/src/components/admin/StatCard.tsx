import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface StatCardProps {
  title: string;
  value: number;
  icon: SvgIconComponent;
  onClick?: () => void;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  onClick,
  className 
}) => (
  <Card 
    sx={{ 
      height: "100%",
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': onClick ? {
        transform: 'translateY(-4px)',
        boxShadow: 3,
      } : {}
    }}
    onClick={onClick}
    className={className}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Icon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default StatCard;