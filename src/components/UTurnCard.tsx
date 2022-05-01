import { Box, Container, Grid } from "@mui/material";
import { useState } from "react";
import { FactModel } from "../services/FactService";

interface UTurnCardItem {
    factItem: FactModel
}

interface UTurnCardProps {
    facts: FactModel[][]
}

interface UTurnCardRow {
    factsRow: FactModel[]
}

function GridItem(props: UTurnCardItem) {
    const [cardColour, setCardColour] = useState("primary.light")

    return (
        <Box sx={{
            backgroundColor: cardColour,
            textAlign: 'center',
            height: 100,
            overflowWrap: 'break-word'
          }} onClick={() => setCardColour("primary.dark")}>{props.factItem.fact}</Box>
    )
}

function FactRow(props: UTurnCardRow) {
    return (
        <Grid container item spacing={1}>
            {props.factsRow.map((fact, index) => (
                <Grid key={`Fact${index}`} item xs={2.4}>
                    <GridItem factItem={fact}/>
                </Grid>
            ))}
        </Grid>
    );
}

export const UTurnCard = (props: UTurnCardProps) => {
    return (
        <Container>
            <Grid container spacing={1}>
                {props.facts.map((factsRow, index) => (
                    <FactRow factsRow={factsRow} key={`Row${index}`} />
                ))}
            </Grid>
        </Container>
    );
}