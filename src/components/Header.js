import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { AppBar, Toolbar, Typography } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';



const Header = ({ city }) => {

	
	const trigger = useScrollTrigger();
	return (
		<AppBar position="sticky" color="secondary" elevation={ trigger ? 0 : 6 }>
        <Toolbar>
	  <LocationOnIcon />&nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
		{city}
          </Typography>
          
	</Toolbar>
      </AppBar>
	)
}

export default Header;
