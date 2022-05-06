import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, Autocomplete, TextField, DialogActions, Button } from "@mui/material";
import { PlayerGetDTO } from "../../services/PlayerProfileService";
import { FactModel } from "../../services/FactService";

interface SubmitAnswerDialogProps {
    open: boolean,
    onClose: () => void
    factDetails: FactModel
    factOwners: Array<PlayerGetDTO>
}

interface GuessingDialogProps {
    open: boolean,
    onClose: () => void
    factDetails: FactModel
    factOwners: Array<PlayerGetDTO>
    onSubmit: (factOwnerName: string | null) => void
}

interface IncorrectAnswerDialog {
    open: boolean
    onClose: () => void
    onTryAgain: () => void
}

const IncorrectGuessDialog = (props: IncorrectAnswerDialog) => {
    return(
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Incorrect</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {"Try Again!"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
                <Button onClick={props.onTryAgain}>Try Again</Button>
            </DialogActions>
        </Dialog>
    )
}

const GuessingForm = (props: GuessingDialogProps) => {
    const [factOwnerGuess, setFactOwnerGuess] = useState<string | null>(null)

    function isGuessEmpty() {
        if(factOwnerGuess === null) {
            return true
        } else {
            return false
        }
    }
    
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Who wrote this fact?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.factDetails.fact}
                </DialogContentText>
                <Autocomplete
                    onChange={(event: any, newValue: string | null) => {
                        setFactOwnerGuess(newValue);
                    }}
                    options={props.factOwners.map((factOwnerDetails) => factOwnerDetails.name)}
                    renderInput={(params) => <TextField {...params} label="Name"/>}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={() => props.onSubmit(factOwnerGuess)} disabled={isGuessEmpty()}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}

export const GuessFactOwnerDialog = (props: SubmitAnswerDialogProps) => {
    const [isCorrect, setIsCorrect] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)
    
    function isGuessCorrect(factOwnerName: string | null ) {
        if (factOwnerName === props.factDetails.playerName) {
            setIsCorrect(true)
        } else {
            setIsIncorrect(true)
        }
    }

    function handleCloseDialog() {
        setIsCorrect(false)
        setIsIncorrect(false)
        props.onClose()
    }

    function handleTryAgain() {
        setIsCorrect(false)
        setIsIncorrect(false)
    }

    if (isCorrect) {
        return (
            <Dialog open={props.open} onClose={handleCloseDialog}>
                <DialogTitle>Correct</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Congratulations you guessed correctly!"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    } 
    else if (isIncorrect) {
        return (
            <IncorrectGuessDialog open={props.open}
                onClose={handleCloseDialog} 
                onTryAgain={handleTryAgain}
            />
        );
    }
    else {
        return (
            <GuessingForm open={props.open}
                factDetails={props.factDetails}
                factOwners={props.factOwners}
                onClose={handleCloseDialog} 
                onSubmit={isGuessCorrect}
            />
        );
    }
}