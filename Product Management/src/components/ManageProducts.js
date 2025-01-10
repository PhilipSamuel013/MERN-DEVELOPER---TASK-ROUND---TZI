import React from 'react';
import { Paper, Typography } from '@mui/material';

const ManageProducts = () => {
  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Manage Products
      </Typography>
      <Typography variant="body1">
        Here you can manage your products.
      </Typography>
    </Paper>
  );
};

export default ManageProducts;
