import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#222', color: '#fff', padding: '20px', textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; 2025 My E-Commerce. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
