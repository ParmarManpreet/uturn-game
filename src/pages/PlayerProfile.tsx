import { Box, Button, IconButton, Input, TextField } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { useState } from "react";

export const PlayerProfile = () => {
    const [isWaitingForStart, setIsWaitingForStart] = useState(false)
    const [isGameStarting, setIsGameStarting] = useState(false)
    const Input = styled('input')({
        display: 'none',
      });

    

    if (isWaitingForStart) {
        return (
            <div>Waiting...</div>
        )
    }
    
    else if (isGameStarting) {
        return (
            <div>Game Starting</div>
        )
    } 
    
    else {
        return (
            
            <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField
                    id="player-name"
                    label="Enter your name"
                    type="string"
                    variant="filled"
                />
                <TextField
                    id="player-fact#1"
                    label="Enter first fact"
                    type="string"
                    variant="filled"
                />
                <TextField
                    id="player-fact#2"
                    label="Enter second fact"
                    type="string"
                    variant="filled"
                />
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                {/* <Button
                variant="contained"
                component="label"
                >
                Upload Your Profile Picture
                <input
                    type="file"
                    hidden
                />
                </Button> */}

                {/* <div>Player Profile Page</div>
                <div>Enter your Name</div>
                <input type="text"></input>
                <div>Fact #1</div>
                <input type="text"></input>
    
                <div>Fact #2</div>
                <input type="text"></input> */}

                <Button  variant="contained" disableElevation onClick={() => setIsWaitingForStart(true)}>Submit</Button>
           
            </Box>
        );
    }
}