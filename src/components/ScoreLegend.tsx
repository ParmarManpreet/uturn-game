import { Box } from "@mui/material";

interface ScoreLegendProps {
    isScoreVisible: boolean
    translate : (key: string) => string

}

export const ScoreLegend = (props: ScoreLegendProps) => {
    return (
        <>
            {props.isScoreVisible === true ? 
                <Box sx={{marginBottom: '0px', color:'black', display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'flex-start', justifyContent:'space-evenly'}}>
                    <span>{props.translate('uturn-legend-row')}</span>
                    <span>{props.translate('uturn-legend-column')}</span>
                    <span>{props.translate('uturn-legend-diagonal')}</span>
                    <span>{props.translate('uturn-legend-entire-card')}</span>
                </Box> : null
            }
        </>
        
    );
}