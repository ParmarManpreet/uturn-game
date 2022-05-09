import { Box } from "@mui/material";

export const ScoreLegend = () => {
    return (
        <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'flex-start', justifyContent:'space-evenly'}}>
            <span>Full Row: 100 Points</span>
            <span>Full Column: 100 Points</span>
            <span>Full Diagonal: 500 Points</span>
            <span>Entire Card: 2000 Points</span>
        </Box>
    );
}