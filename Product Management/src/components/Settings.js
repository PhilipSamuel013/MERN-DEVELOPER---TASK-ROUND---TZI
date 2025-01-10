import React from 'react';
import { Paper, Typography } from '@mui/material';

const Settings = () => {
  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1">
        Configure your product management system here.
      </Typography>
    </Paper>
  );
};

export default Settings;
