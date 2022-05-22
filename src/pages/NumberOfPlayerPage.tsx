import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";


export const NumberOfPlayerPage = () => {
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
            console.log(factsPerPerson)
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
                <h1>Number of players</h1>
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
                    label="Enter Number of Players"
                    variant="filled"
                    value={numberOfPlayers} onChange={handlePlayerInputChange}>
                </TextField>
                <Button sx={{ color: 'white', marginTop: '8px' }} variant="contained" disableElevation onClick={handleSubmit}>Submit</Button>
                </Box>
            </section>
            </>
        );
    }