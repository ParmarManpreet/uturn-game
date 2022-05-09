import { Box, Button, FormControl, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";
import { Card, Form } from 'react-bootstrap'
import * as React from 'react'
import { Link, Navigate, Route, useLocation, useNavigate } from "react-router-dom"


export const NumberOfPlayerPage = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState("")
    const [numberOfFacts, setNumberOfFacts] = useState("")
    const regex = /^[0-9\b]+$/
    const navigate = useNavigate();

    const redirectToPlayerLinkPage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate('/player-links', { state: { numberOfFacts} })
        // {
        //     <Link
        //         to={{
        //             pathname: "/page",
        //             state: numberOfFacts // your data array of objects
        //         }}
        // ></Link>
        // }
    }

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("submit")
        redirectToPlayerLinkPage(e)
        
    }


    const handleFactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numberFacts = e.target.value  
        console.log("handle # facts ")
        console.log(numberFacts)
        console.log(regex.test(numberFacts))

        if (numberFacts === "" || regex.test(numberFacts)) {
            setNumberOfFacts(numberFacts)
        }
    }
    
    const handlePlayerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numberPlayers = e.target.value  
        console.log("handle # players ")
        console.log(numberPlayers)
        console.log(regex.test(numberPlayers))

        if (numberPlayers === "" || regex.test(numberPlayers)) {
            setNumberOfPlayers(numberPlayers)
        }
    }

        return (
            <>
            <section className="select-groups">
                <div className="select-groups__body">
                    <Card className="select-groups__body__card">
                        {/* <FormControl sx={{ width: '30ch' }}> */}
                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <h3 style={{"textAlign": "center"}}> How Many Players Are There? </h3>
                                <Form.Group className="mb-3" controlId="formNumberOfPlayers">
                                    <Form.Label>How Many Players Are There? </Form.Label>
                                    <OutlinedInput type="text"  placeholder="Number of Players" onChange={(e) => handlePlayerInputChange(e as any) } value={numberOfPlayers} style={{"textAlign": "center"} }/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formNumberOfFacts">
                                <Form.Label>How Many Facts Per Player </Form.Label>
                                <OutlinedInput type="text"  placeholder="Number of Facts" onChange={(e) => handleFactInputChange(e as any) } value={numberOfFacts} style={{"textAlign": "center"}}/>
                                </Form.Group>

                                <div className="d-grid gap-5">
                                    <Button variant="contained" color="primary" type="submit" disabled={numberOfPlayers.length <= 0}>
                                        Submit
                                    </Button>
                                </div>
                            </Form> 
                    </Card>
                </div>
            </section>
            </>
    
        );
    }
// }