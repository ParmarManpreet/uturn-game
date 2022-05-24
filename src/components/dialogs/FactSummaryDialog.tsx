import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FactModelGetDTO } from "../../services/FactService";

interface FactSummaryDialogProps {
    open: boolean
    onClose: () => void
    selectedFact: FactModelGetDTO
    translate : (key: string) => string
}

export const FactSummaryDialog = (props: FactSummaryDialogProps) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
        maxWidth={'sm'}>
            <DialogTitle>{props.translate('fact-dialog-title')}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{textAlign: 'center', marginBottom:2}}>
                    <strong>{props.selectedFact.playerName}</strong>
                </DialogContentText>
                <Box sx={{width: '100%'}}>
                    <Avatar sx={{marginLeft:'auto', marginRight:'auto'}} src={props.selectedFact.playerPicture}></Avatar>
                </Box>
                <DialogContentText sx={{textAlign: 'center', marginTop: 2}}>
                    {props.selectedFact.fact}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>{props.translate('fact-dialog-close')}</Button>
            </DialogActions>
        </Dialog>
    );
}