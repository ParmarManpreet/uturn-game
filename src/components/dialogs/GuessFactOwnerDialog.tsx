import { Dialog, DialogTitle, DialogContent, DialogContentText, Autocomplete, TextField } from "@mui/material";
import { PlayerGetDTO } from "../../services/PlayerProfileService";

interface SubmitAnswerDialogProps {
    open: boolean,
    onClose: () => void
    factText: string
    factOwners: Array<string>
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
                    freeSolo
                    options={props.factOwners.map((factOwnerDetails) => factOwnerDetails)}
                    renderInput={(params) => <TextField {...params} label="Name" />}
                />
            </DialogContent>
        </Dialog>
    );
}