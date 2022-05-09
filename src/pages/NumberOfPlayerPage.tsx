import { Button, TextField } from "@mui/material";
import { useState } from "react";
import * as React from 'react'
import { useNavigate } from "react-router-dom"


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
                <h1>Number of players</h1>
                <TextField value={numberOfPlayers} onChange={handlePlayerInputChange}></TextField>
                <Button onClick={handleSubmit}>Submit</Button>
            </>
    
        );
    }
// }