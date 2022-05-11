import { Box, CircularProgress } from "@mui/material"

export const LoadingView = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress />
        </Box>
    );
} 