import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { cloneElement, JSXElementConstructor, ReactElement} from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface Props {
    window?: () => Window;
    children: ReactElement<any, string | JSXElementConstructor<any>>;
  }

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

  return (
    // <React.Fragment>
    <ElevationScroll {...props}>
    <AppBar sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>

        </Toolbar>
    </AppBar>
    </ElevationScroll>
    // </React.Fragment>
  );
};

export default Footer;
