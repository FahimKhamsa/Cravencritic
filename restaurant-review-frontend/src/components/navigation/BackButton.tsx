import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  to: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowLeft className="w-4 h-4" />}
      onClick={() => navigate(to)}
      sx={{ mb: 2 }}
      variant="outlined"
    >
      Back
    </Button>
  );
};

export default BackButton;