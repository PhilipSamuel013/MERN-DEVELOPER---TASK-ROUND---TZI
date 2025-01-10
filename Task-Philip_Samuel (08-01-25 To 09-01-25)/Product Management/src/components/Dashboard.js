import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <h2>Get ready to sell</h2>
        <p>As your business grows, you’ll get fresh tips and insights here.</p>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5">Products</Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>$50000</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5">Selling</Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>$5000</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5">Revenue</Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>$1000</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5">Points</Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>$15.520</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5">Remarks</Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>$80%</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5">Ratings</Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>*****</Typography>
        </Paper>
      </Grid>
      
    </Grid>
    
    );
    
  };
  
export default Dashboard;
