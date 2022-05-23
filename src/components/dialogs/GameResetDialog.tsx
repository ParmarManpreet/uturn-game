import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface GameResetDialogProps {
  open: boolean,
  onClose: () => void
  onReset: () => void
}

export const GameResetDialog = (props: GameResetDialogProps) => {
  const [resetText, setResetText] = useState("")

  function handleTextInput(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    let currentText = e.target.value
    setResetText(currentText)
  }

  function handleGameReset() {
    if(resetText === 'Reset Game') {
      props.onReset()
    }
  }

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>Game Already in Session!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Reset the Game Please Type <strong>Reset Game</strong>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reset Game"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => handleTextInput(e)}
            value={resetText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleGameReset}>Reset Game</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}