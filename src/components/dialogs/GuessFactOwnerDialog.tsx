import { Dialog, DialogTitle, DialogContent, DialogContentText, Autocomplete, TextField } from "@mui/material";
import { PlayerGetDTO } from "../../services/PlayerProfileService";

interface SubmitAnswerDialogProps {
    open: boolean,
    onClose: () => void
    factText: string
    factOwners: Array<PlayerGetDTO>
}

export const GuessFactOwnerDialog = (props: SubmitAnswerDialogProps) => {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Who wrote this fact?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.factText}
                </DialogContentText>
                <Autocomplete
                    options={props.factOwners.map((factOwnerDetails) => factOwnerDetails.name)}
                    renderInput={(params) => <TextField {...params} label="Name" />}
                />
            </DialogContent>
        </Dialog>
    );
}