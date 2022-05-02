import { Box, Button, FormControl, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Card, Form } from 'react-bootstrap'
import * as React from 'react'
import { Navigate } from "react-router-dom"

const alphaNumeric: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"

function createUrlHash(): string {
    let hash = ""
    for(let i = 0; i < 6; i++) {
        const index: number = Math.floor(alphaNumeric.length * Math.random())
        hash = hash + alphaNumeric.charAt(index)
    }
    console.log(hash)
    return hash
}


export const SelectPlayerPage = () => {
    const [isRedirecting, setIsRedirecting] = useState(false)
    const [numberOfPlayers, setNumberOfPlayers] = useState("")
    const [defaultNumberOfFacts, setDefaultNumberOfFacts] = useState(2)
    const regex = /^[0-9\b]+$/

    const redirectToPlayerLinkPage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        savePlayers(Number(numberOfPlayers))
        setIsRedirecting(true)
    }

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("submit")
        redirectToPlayerLinkPage(e)
    }

    async function savePlayers(numberOfPlayers: number) {
        try {
            for(let i = 0; i < numberOfPlayers; i++) {
                const urlHash: string = createUrlHash()
                const playerId: string = `Player${i}`
                // await PlayerHandService.createGroups(i, urlHash)
                // CounterService.createCounter(playerId)
            }
        } catch (error) {
            console.log(error)
        }      
    }
    
    async function numberOfFacts(numberOfPlayer: string, e:any) {
        if (numberOfPlayer === "" || regex.test(numberOfPlayer)) {
            setNumberOfPlayers(numberOfPlayer)

            if(((Number(numberOfPlayers) - 1)*defaultNumberOfFacts) < 25){
                setDefaultNumberOfFacts(defaultNumberOfFacts + 1)
                //redirectToPlayerLinkPage(e)
            } else {
                //redirectToPlayerLinkPage(e)
            }
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let number = e.target.value  
        console.log("handle")
        console.log(number)
        console.log(regex.test(number))
        
        numberOfFacts(number, e)
    }
    if (isRedirecting) {
        return(
            <Navigate  
                to={{
                    pathname: "/player-links",
                    // state: {numberOfPlayers: numberOfPlayers} 
                }} 
            />
        )
    } else {
        return (
            <>
            <section className="select-groups">
                {/* <div className="select-groups__overlay"> </div> */}
                <div className="select-groups__body">
                    <Card className="select-groups__body__card">
                    <FormControl sx={{ width: '30ch' }}>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <h2> How Many Players Are There? </h2>
                            <Form.Group className="mb-3" controlId="formNnumberOfGroups">
                                {/* <Form.Control type="text" placeholder="Number of Players" onChange={(e) => handleInputChange(e as any) } value={numberOfPlayers} style={{"textAlign": "center"}}/> */}
                                <OutlinedInput type="text"  placeholder="Number of Players" onChange={(e) => handleInputChange(e as any) } value={numberOfPlayers} style={{"textAlign": "center"}}/>
                            </Form.Group>
                            <div className="d-grid gap-5">
                                <Button variant="contained" color="primary" type="submit" disabled={numberOfPlayers.length <= 0}>
                                    Submit
                                </Button>
                            </div>
                        </Form> 
                    </FormControl>
                        {/* <Form onSubmit={(e) => handleSubmit(e)}>
                            <h2> How Many Players Are There? </h2>
                            <Form.Group className="mb-3" controlId="formNnumberOfGroups">
                                <Form.Control type="text" placeholder="Number of Players" onChange={(e) => handleInputChange(e as any) } value={numberOfPlayers} style={{"textAlign": "center"}}/>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="contained" color="primary" type="submit" disabled={numberOfPlayers.length <= 0}>
                                    Submit
                                </Button>
                            </div>
                        </Form>  */}
                    </Card>
                </div>
            </section>
            </>
    
        );
    }
}