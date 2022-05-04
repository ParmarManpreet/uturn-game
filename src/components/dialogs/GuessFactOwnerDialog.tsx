import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";

interface SubmitAnswerDialogProps {
    open: boolean,
    onClose: () => void
    factText: string
}

export const GuessFactOwnerDialog = (props: SubmitAnswerDialogProps) => {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Who wrote this fact?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.factText}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}