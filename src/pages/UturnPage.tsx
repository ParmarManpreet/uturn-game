import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { FactModel } from "../services/FactService";
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

export const UturnPage = () => {
    const emptyFactList: Array<FactModel> = []
    const [facts, setFacts] = useState(emptyFactList)

    console.log(facts)

    useEffect(() => {
        async function fetchAllPlayableFacts(playerId: string) {
            const playableFacts = await getAllFactsNotFromCurrentPlayer(playerId)
            if(playableFacts) {
                const shuffledFacts = shufflePlayableFacts(playableFacts)
                setFacts(shuffledFacts)
            }
        }

        function shufflePlayableFacts(playableFacts: Array<FactModel>) {
            let playableFactsCopy = [...playableFacts]
            let shuffledFacts: Array<FactModel> = []
            for(let indexesToSort = playableFactsCopy.length; indexesToSort > 0; indexesToSort--) {
                const index: number = Math.floor(Math.random() * indexesToSort)
                const removedItem = playableFactsCopy.splice(index, 1)[0]
                shuffledFacts.push(removedItem)
            }
            return shuffledFacts.slice(0, 25)
        }

        fetchAllPlayableFacts("XR4MJZTHPDMjdeztyHvH")
    }, [])
    
    return (
        <UTurnCard/>
    )
}