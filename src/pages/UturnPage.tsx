import { Box, Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { getAllFactsNotFromCurrentPlayer } from "../services/PlayerProfileService";

function Card() {
    return (
        <Box sx={{
            backgroundColor: 'primary.light',
            textAlign: 'center',
            height: 100
          }}>hello</Box>
    )
}

function FormRow() {
    return (
        <>
            <Grid item xs={2.4}>
                <Card/>
            </Grid>
            <Grid item xs={2.4}>
                <Card/>
            </Grid>
            <Grid item xs={2.4}>
                <Card/>
            </Grid>
            <Grid item xs={2.4}>
                <Card/>        
            </Grid>
            <Grid item xs={2.4}>
                <Card/>
            </Grid>
        </>
    );
}

function UTurnCard() {
    return (
        <Container>
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <FormRow key={1}/>
                </Grid>
                <Grid container item spacing={3}>
                    <FormRow key={2}/>
                </Grid>
                <Grid container item spacing={3}>
                    <FormRow key={3}/>
                </Grid>
                <Grid container item spacing={3}>
                    <FormRow key={4}/>
                </Grid>
                <Grid container item spacing={3}>
                    <FormRow key={5}/>
                </Grid>
            </Grid>
        </Container>
    );
}

async function fetchAllPlayableFacts(playerId: string) {
    const playableFacts = await getAllFactsNotFromCurrentPlayer(playerId)
    console.log(playableFacts)
}

export const UturnPage = () => {
    useEffect(() => {
        fetchAllPlayableFacts("XR4MJZTHPDMjdeztyHvH")  
    }, [])
    
    return (
        <UTurnCard/>
    )
}