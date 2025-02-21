import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AppBarComponent = ({ handleDrawerToggle }) => {
  return (
    <AppBar position="fixed" className="appBar" style={{ zIndex: 1201 }}>
      <Toolbar className='mainbar'>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className="menuButton"
        >
          <MenuIcon />
        </IconButton>
        <Typography  variant= "h4" lassName="title"> Clinical Trials  </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;