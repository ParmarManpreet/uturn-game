import UTurnLogoWhite from "./logos/UTURN2.png"
import { Box, CircularProgress } from "@mui/material"

export const LoadingView = () => {
    return (
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height: '100%' }}>
                <Box>
                    <img src={UTurnLogoWhite} alt="Uturn Logo" height="180"/>
                    <Box sx={{marginTop:1}}>
                        <CircularProgress />
                    </Box>
                </Box>  
        </Box>
    );
} 