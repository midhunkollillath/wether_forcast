import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import  summerImg from '../assets/download.jpeg'
import Monsoon from '../assets/monsoon-farming-13809570.webp'
import Snow from '../assets/HD-wallpaper-snow-landscape-landscape-snow-thumbnail.jpg'
function Header() {
  return (
    <AppBar sx={{mb:3}} position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Left cloud image */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
            <img 
              src={summerImg} 
              alt="Cloud Left" 
              style={{ width: 60, height: 40 }} 
            />
          </Box>
          
          {/* Centered title */}
          <Typography variant="h4" component="div" gutterBottom textAlign="center">
            Weather Dashboard
          </Typography>
          
          {/* Right cloud image */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
            <img 
              src={summerImg} 
              alt="Cloud Left" 
              style={{ width: 60, height: 40 }} 
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
