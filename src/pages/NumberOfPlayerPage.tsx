import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { setGameId } from "../services/GameStatesService";

interface NumberofPlayerProps {
    translate : (key: string) => string
}


const alphaNumeric: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"

function createGameId(): string {
    let hash = ""
    for(let i = 0; i < 6; i++) {
        const index: number = Math.floor(alphaNumeric.length * Math.random())
        hash = hash + alphaNumeric.charAt(index)
    }
    console.log(hash)
    return hash
}

export const NumberOfPlayerPage = (props : NumberofPlayerProps) => {
    const [numberOfPlayers, setNumberOfPlayers] = useState("")
    const regex = /^[0-9\b]+$/

    let navigate = useNavigate();

    const redirectToPlayerLinkPage = (factsPerPerson: number) => {
        navigate('/player-links', { state: {numberOfFacts: factsPerPerson} })
    }

    function handleSubmit () {
        let factsPerPerson = 1
        let playerCount = parseInt(numberOfPlayers)
        if (playerCount <= 1) {
            console.log("Cannot be less than 1")
        } else {
            while(factsPerPerson * (playerCount - 1) < 25) {
                factsPerPerson++
            }

            const gameId = createGameId() 
            setGameId(gameId)
            redirectToPlayerLinkPage(factsPerPerson)
        }
    }
    
    const handlePlayerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numberPlayers = e.target.value

        if (numberPlayers === "" || regex.test(numberPlayers)) {
            setNumberOfPlayers(numberPlayers)
        }
    }

        return (
            <>
            <Navbar isAdmin={true} ></Navbar>
            <section className="home">
                <h1>{props.translate('number-players-title')}</h1>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { m: 1, width: '25ch' , backgroundColor:'white'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                <TextField
                    sx={{'& label.Mui-focused': {
                        color: 'black',
                        },
                    }}
                    id="player-number"
                    label={props.translate('number-players-entry-text')}
                    variant="filled"
                    value={numberOfPlayers} onChange={handlePlayerInputChange}>
                </TextField>
                <Button sx={{ color: 'white', marginTop: '8px' }} variant="contained" disableElevation onClick={handleSubmit}>{props.translate('number-players-submit')}</Button>
                </Box>
            </section>
            <Footer children={undefined!} isScore={false} ></Footer>
            </>
        );
    }