import { Box } from "@mui/material";

interface ScoreLegendProps {
    isScoreVisible: boolean
}

export const ScoreLegend = (props: ScoreLegendProps) => {
    return (
        <>
            {props.isScoreVisible === true ? 
                <Box sx={{color:'white', display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'flex-start', justifyContent:'space-evenly'}}>
                    <span>Full Row: 100 Points</span>
                    <span>Full Column: 100 Points</span>
                    <span>Full Diagonal: 500 Points</span>
                    <span>Entire Card: 2000 Points</span>
                </Box> : null
            }
        </>
        
    );
}