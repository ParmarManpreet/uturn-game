import UTurnLogoWhite from "./logos/UTURN2.png"
import { Box } from "@mui/material"

interface propGameInProgress {
    translate : (key: string) => string
}

export const GameInProgressView = (props : propGameInProgress) => {
    return (
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height: '100%' }}>
            <Box>
                <img src={UTurnLogoWhite} alt="Uturn Logo" height="180"/>
                <Box sx={{marginTop:1}}>
                    <h1>{props.translate('loading-game-progress')}</h1>
                </Box>
            </Box>  
        </Box>
    );
} 