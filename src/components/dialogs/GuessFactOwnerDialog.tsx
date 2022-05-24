import { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, Autocomplete, TextField, DialogActions, Button, Paper, Avatar } from "@mui/material";
import { PlayerGetDTO } from "../../services/PlayerProfileService";
import { FactModelGetDTO } from "../../services/FactService";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { green, red } from "@mui/material/colors";
import { LangContext } from "../../context/lang";

interface CorrectAnswerDialog {
    open: boolean
    onClose: () => void
    translate : (key: string) => string
}

interface IncorrectAnswerDialog {
    open: boolean
    onClose: () => void
    onTryAgain: () => void
    translate : (key: string) => string

}

interface GuessingDialogProps {
    selectedFact: FactModelGetDTO,
    open: boolean,
    onClose: () => void
    factOwners: Array<PlayerGetDTO>
    onSubmit: (factOwnerName: string | null) => void
    translate : (key: string) => string

}

interface SubmitAnswerDialogProps {
    selectedFact: FactModelGetDTO,
    open: boolean,
    onClose: () => void
    factOwners: Array<PlayerGetDTO>
    onSubmitCorrectAnswer: () => void
    translate : (key: string) => string

}


const CorrectGuessDialog = (props: CorrectAnswerDialog) => {
    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
        maxWidth={'sm'}>
            <DialogTitle className="dialog_title">{props.translate('guessfact-dialog-correct')}</DialogTitle>
            <DialogContent>
                <Paper elevation={3} className="dialog">
                        <Avatar sx={{width:'60px', height:'60px', marginBottom: 2, backgroundColor: green[500]}} className="dialog_content">
                            <SentimentSatisfiedAltIcon sx={{height:'70%', width:'70%'}}/>
                        </Avatar>
                        <span className="dialog_content">{props.translate('guessfact-dialog-congrats')}</span>
                </Paper>
            </DialogContent>
            <DialogActions className="dialog_actions">
                <Button color="success" onClick={props.onClose}>{props.translate('guessfact-dialog-close')}</Button>
            </DialogActions>
        </Dialog>
    );
}

const IncorrectGuessDialog = (props: IncorrectAnswerDialog) => {
    return(
        <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
        maxWidth={'sm'}>
            <DialogTitle className="dialog_title">{props.translate('guessfact-dialog-incorrect')}</DialogTitle>
            <DialogContent>
                <Paper elevation={3} className="dialog">
                    <Avatar sx={{width:'60px', height:'60px', marginBottom: 2, backgroundColor: red[500]}} className="dialog_content">
                        <SentimentVeryDissatisfiedIcon sx={{height:'70%', width:'70%'}}/>
                    </Avatar>
                    <span className="dialog_content">{props.translate('guessfact-dialog-incorrect')}</span>
                    <span className="dialog_content">{props.translate('guessfact-dialog-tryagain')}</span>
                </Paper>
            </DialogContent>
            <DialogActions className="dialog_actions">
                <Button color="error" onClick={props.onClose}>{props.translate('guessfact-dialog-close')}</Button>
                <Button color="error" onClick={props.onTryAgain}>{props.translate('guessfact-dialog-tryagain')}</Button>
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
        <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
        maxWidth={'sm'}>
            <DialogTitle>{props.translate('guessfact-dialog-who')}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{textAlign: 'center', margin: 2}}>
                    {props.selectedFact.fact}
                </DialogContentText>
                <Autocomplete
                    onChange={(event: any, newValue: string | null) => {
                        setFactOwnerGuess(newValue);
                    }}
                    options={props.factOwners.map((factOwnerDetails) => factOwnerDetails.name)}
                    renderInput={(params) => <TextField {...params} label={props.translate('leaderboard-name')}/>}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>{props.translate('game-dialog-cancel')}</Button>
                <Button onClick={() => props.onSubmit(factOwnerGuess)} disabled={isGuessEmpty()}>{props.translate('guessfact-dialog-submit')}</Button>
            </DialogActions>
        </Dialog>
    );
}

export const GuessFactOwnerDialog = (props: SubmitAnswerDialogProps) => {
    const [isCorrect, setIsCorrect] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)
    const {dispatch: { translate }} = useContext(LangContext);
    
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
            <CorrectGuessDialog open={props.open} onClose={handleCloseDialog} translate={translate}/>
        );
    } 
    else if (isIncorrect) {
        return (
            <IncorrectGuessDialog open={props.open}
                onClose={handleCloseDialog} 
                onTryAgain={handleTryAgain}
                translate={translate}
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
                translate={translate}
            />
        );
    }
}