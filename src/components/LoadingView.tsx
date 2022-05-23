import UTurnLogoWhite from "./logos/UTURN2.png"
import { Box, CircularProgress } from "@mui/material"

interface LoadingViewProps {
    isWaitingForHost: boolean
}

export const LoadingView = (props: LoadingViewProps) => {
    return (
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height: '100%' }}>
            <Box>
                {props.isWaitingForHost ? <h1>Please Wait for Host to Start the Game</h1> : null}
                <img src={UTurnLogoWhite} alt="Uturn Logo" height="180"/>
                <Box sx={{marginTop:1}}>
                    <CircularProgress />
                </Box>
            </Box>  
        </Box>
    );
} 