import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import SettingService from '../services/SettingService';
import UTurnLogoWhite from "./logos/UTURN2.png"
import { NavigationLink } from '../services/PageNavigationService';

interface NavbarProps {
  isAdmin: boolean
}

const pages = ['Home Page', 'Settings'];

const Navbar = (props: NavbarProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [companyLogoURL, setCompanyLogoURL] = useState("")
  const [teamBuildLogoURL, setTeamBuildLogoURL] = useState("")
  const [hasRetreivedLogo, setHasRetreivedLogo] = useState(false)
  useEffect(() => {
    initializeTeamBuildLogo()
    initializeCompanyLogo()
},[])


async function initializeTeamBuildLogo() {
    try {
        const url = await SettingService.getTeamBuildingLogo()
        if(url) {
            setTeamBuildLogoURL(url)
        }
        setHasRetreivedLogo(true)
    } catch (error) {
        console.log(error)
    }
}

async function initializeCompanyLogo() {
    try {
        const url = await SettingService.getCompanyLogo()
        if(url) {
            setCompanyLogoURL(url)
        }
        setHasRetreivedLogo(true)
    } catch (error) {
        console.log(error)
    }
}

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSelection = ( value: string) => {
    //Write code to make page route to the selected page
      if(value === "Settings") {
        <NavigationLink text={'Settings'} path="/settings" />
        console.log("settings")
      }
    setAnchorElNav(null);

  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {
            //Will put this in a seperate class after
            props.isAdmin?
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {hasRetreivedLogo? <img src={UTurnLogoWhite} height="42" alt="Logo"/>: null}
              </IconButton>
            </Tooltip>
            :  
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {hasRetreivedLogo? <img src={UTurnLogoWhite} height="42" alt="Logo"/>: null}
            </Box>
            }
          </Typography>

          {
          //Will put this in a seperate class after
          props.isAdmin?
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleSelection(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          :
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {hasRetreivedLogo? <img src={teamBuildLogoURL} height="32" alt="Logo"/>: null}
          </Box>
          }

          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {hasRetreivedLogo? <img src={UTurnLogoWhite} height="50" alt="Logo"/>: null}
          </Typography >

          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {hasRetreivedLogo? <img src={teamBuildLogoURL} height="40" alt="Logo"/>: null}
          </Typography >

          <Box sx={{ flexGrow: 0 }}>
            {hasRetreivedLogo? <img src={companyLogoURL} height="40" alt="Logo"/>: null}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((pages) => (
              <MenuItem key={pages} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{pages}</Typography>
              </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
