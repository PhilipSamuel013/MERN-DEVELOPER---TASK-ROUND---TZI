import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  const menuItems = [
    { text: 'Home', icon: <DashboardIcon />, path: '/' },
    { text: 'Add Product', icon: <AddBoxIcon />, path: '/add-product' },
    { text: 'Product List', icon: <ListAltIcon />, path: '/product-list' },
    { text: 'Manage Products', icon: <ManageAccountsIcon />, path: '/manage-products' },
    { text: 'Contacts', icon: <SettingsIcon />, path: '/' },
  ];

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          position: 'fixed',
          top: '64px', 
          backgroundColor: '#f5f5f5', 
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            sx={{
              '&:hover': {
                backgroundColor: '#e0e0e0', 
              },
            }}
          >
            <ListItemIcon sx={{ color: '#555' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
