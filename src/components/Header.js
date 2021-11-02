import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Toolbar, Typography, InputBase, Autocomplete } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 15,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 }
];

const Header = ({ city, searchCity, setSearchCity }) => {

	const handleKeyPress = (event) => {
		if(event.key === 'Enter') {
			 setSearchCity(event.target.value)
		}
	}
	const trigger = useScrollTrigger();
	return (
		<AppBar position="sticky" color="secondary" elevation={ trigger ? 0 : 6 }>
        <Toolbar>
	  <LocationOnIcon />&nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
		{searchCity ? searchCity : city }
          </Typography>
          <Search>                     
	    <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
		<Autocomplete
		autoHighlight
		id="id"
		options={top100Films}
		getOptionLabel={(option) => option.title}
		renderOption={(option) =>(
			<Typography>auto {option.title} </Typography>
		)}
		renderInput={(params) => (
            <StyledInputBase
	{...params}
	placeholder="Search…"
	value={searchCity}
	onKeyPress={handleKeyPress}
        inputProps={{ ...params.inputProps,
	'aria-label': 'search',
	autocomplete: 'new-password' }}
	/>  
	)}
	/>
	</Search>
	</Toolbar>
      </AppBar>
	)
}

export default Header;
