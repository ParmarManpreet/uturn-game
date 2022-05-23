import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { cloneElement, JSXElementConstructor, ReactElement, useContext, useState} from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { LangContext } from '../context/lang';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { PlayerScore } from './PlayerScore';
import { ScoreLegend } from './ScoreLegend';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';


interface Props {
    window?: () => Window;
    children: ReactElement<any, string | JSXElementConstructor<any>>;
    isScore: boolean
  }
//   const language = ['EN', 'FR'];


  function ElevationScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }


const Footer = (props: Props) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null); 
    const { state: { language }, dispatch: { setLanguage, translate } } = useContext(LangContext);
    const emptyCardProgress: boolean[][] = []
    const [cardProgress, setCardProgress] = useState(emptyCardProgress)
        // Game State for Score Visibility
    const [isScoreVisible, setIsScoreVisible] = useState(false)
    const [url, setUrl] = useState("")

    
    function handleSelectLanguage(language: string): React.MouseEventHandler<HTMLLIElement> | undefined {
        console.log(language)
        handleCloseUserMenu()
        setLanguage(language);
        return undefined
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
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

  return (
    <ElevationScroll {...props}>
    <AppBar sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
        <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                EN/FR
            </Button>
            <Menu
              sx={{ mt: '0px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            <MenuItem key={'EN'} onClick={() => handleSelectLanguage('EN')}>
                <Typography textAlign="center">EN</Typography>
            </MenuItem>
            <MenuItem key='FR' onClick={() => handleSelectLanguage('FR')}>
                <Typography textAlign="center">FR</Typography>
            </MenuItem>
            {/* //   ))} */}
            </Menu>
        </Box>
        {
          props.isScore?
          <Box sx={{ flexGrow: 0 }}>
          <Button color="inherit" onClick={handleOpenNavMenu} sx={{ alignItems:'right', p:0}}>
            <WorkspacePremiumIcon/>
          </Button>
          <Menu
              sx={{ mt: '0px' }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <ScoreLegend isScoreVisible={true} translate={translate}/>
            </Menu>
        </Box>
          :
          null
        }
        </Toolbar>
    </AppBar>
    </ElevationScroll>
  );
};

export default Footer;


