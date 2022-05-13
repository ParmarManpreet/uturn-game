import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, Autocomplete, TextField, DialogActions, Button, Paper, Avatar, styled } from "@mui/material";
import { PlayerGetDTO } from "../../services/PlayerProfileService";
import { FactModelGetDTO } from "../../services/FactService";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { green, red } from "@mui/material/colors";

interface CorrectAnswerDialog {
    open: boolean
    onClose: () => void
}

interface IncorrectAnswerDialog {
    open: boolean
    onClose: () => void
    onTryAgain: () => void
}

interface GuessingDialogProps {
    selectedFact: FactModelGetDTO,
    open: boolean,
    onClose: () => void
    factOwners: Array<PlayerGetDTO>
    onSubmit: (factOwnerName: string | null) => void
}

interface SubmitAnswerDialogProps {
    selectedFact: FactModelGetDTO,
    open: boolean,
    onClose: () => void
    factOwners: Array<PlayerGetDTO>
    onSubmitCorrectAnswer: () => void
}


const CorrectGuessDialog = (props: CorrectAnswerDialog) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
        maxWidth={'sm'}>
            <DialogTitle className="dialog_title">Correct</DialogTitle>
            <DialogContent>
                <Paper elevation={3} className="dialog">
                        <Avatar sx={{width:'60px', height:'60px', marginBottom: 2, backgroundColor: green[500]}} className="dialog_content">
                            <SentimentSatisfiedAltIcon sx={{height:'70%', width:'70%'}}/>
                        </Avatar>
                        <span className="dialog_content">{`Congratulations!`}</span>
                </Paper>
            </DialogContent>
            <DialogActions className="dialog_actions">
                <Button color="success" onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

const IncorrectGuessDialog = (props: IncorrectAnswerDialog) => {
    return(
        <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
        maxWidth={'sm'}>
            <DialogTitle className="dialog_title">Incorrect</DialogTitle>
            <DialogContent>
                <Paper elevation={3} className="dialog">
                    <Avatar sx={{width:'60px', height:'60px', marginBottom: 2, backgroundColor: red[500]}} className="dialog_content">
                        <SentimentVeryDissatisfiedIcon sx={{height:'70%', width:'70%'}}/>
                    </Avatar>
                    <span className="dialog_content">{`Incorrect`}</span>
                    <span className="dialog_content">{`Please Try Again!`}</span>
                </Paper>
            </DialogContent>
            <DialogActions className="dialog_actions">
                <Button color="error" onClick={props.onClose}>Close</Button>
                <Button color="error" onClick={props.onTryAgain}>Try Again</Button>
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

    // const ResizableDialog = styled(Dialog)(({ theme }) => ({
    //     [theme.breakpoints.down('md')]: {
    //         padding: 1,
    //         height:'110px',
    //         fontSize: '0.8rem'
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         padding: 2,
    //         height:'200px',
    //     }
    // }));    

    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
        maxWidth={'sm'}>
            <DialogTitle>Who wrote this fact?</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{textAlign: 'center', margin: 2}}>
                    {props.selectedFact.fact}
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
        if (factOwnerName === props.selectedFact.playerName) {
            props.onSubmitCorrectAnswer()
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
            <CorrectGuessDialog open={props.open} onClose={handleCloseDialog}/>
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
            <GuessingForm selectedFact={props.selectedFact}
                open={props.open}
                factOwners={props.factOwners}
                onClose={handleCloseDialog} 
                onSubmit={isGuessCorrect}
            />
        );
    }
}