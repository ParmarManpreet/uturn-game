import UTurnLogoWhite from "./logos/UTURN2.png"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

interface propGameInProgress {
    numberOfFacts: number
    translate : (key: string) => string
}

export const GameInProgressView = (props : propGameInProgress) => {
    let navigate = useNavigate();
    
    return (
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height: '100%' }}>
            <Box>
                <img src={UTurnLogoWhite} alt="Uturn Logo" height="180"/>
                <Box sx={{marginTop:1}}>
                    <h1>{props.translate('loading-game-progress')}</h1>
                    <Button variant="contained" onClick={() => navigate(`/player-profile/override/?factNumber=${props.numberOfFacts}`)}>{props.translate('create-profile-title')}</Button>
                </Box>
            </Box>  
        </Box>
    );
} 