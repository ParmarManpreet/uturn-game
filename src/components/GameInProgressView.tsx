import UTurnLogoWhite from "./logos/UTURN2.png"
import { Box } from "@mui/material"

export const GameInProgressView = () => {
    return (
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height: '100%' }}>
            <Box>
                <img src={UTurnLogoWhite} alt="Uturn Logo" height="180"/>
                <Box sx={{marginTop:1}}>
                    <h1>Sorry a Game is In Progress</h1>
                </Box>
            </Box>  
        </Box>
    );
} 