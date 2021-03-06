import UTurnLogoWhite from "./logos/UTURN2.png"
import { Box, CircularProgress } from "@mui/material"

interface LoadingViewProps {
    isWaitingForHost: boolean
    translate : (key: string) => string
}

export const LoadingView = (props: LoadingViewProps) => {

    window.onpopstate = function () {
        window.history.go(1);
    };
    
    window.addEventListener("beforeunload", (ev) => {  
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });
    
    return (
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height: '100%' }}>
            <Box>
                {props.isWaitingForHost ? <h1>{props.translate('loading-message')}</h1> : null}
                <img src={UTurnLogoWhite} alt="Uturn Logo" height="180"/>
                <Box sx={{marginTop:1}}>
                    <CircularProgress />
                </Box>
            </Box>  
        </Box>
    );
} 