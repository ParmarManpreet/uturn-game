import { Box, Container, Grid } from "@mui/material";
import { useState } from "react";
import { FactModel } from "../services/FactService";

export interface FactPosition {
    rowIndex: number
    columnIndex: number
}

interface UTurnCardItem {
    factItem: FactModel
    rowIndex: number
    columnIndex: number
    onItemSelect: (factDetails: FactModel, cardPosition: FactPosition) => void
}

interface UTurnCardProps {
    facts: FactModel[][]
    onItemSelect: (factDetails: FactModel, cardPosition: FactPosition) => void
}

interface UTurnCardRow {
    factsRowData: FactModel[],
    rowIndex: number
    onItemSelect: (factDetails: FactModel, cardPosition: FactPosition) => void
}

function GridItem(props: UTurnCardItem) {
    const [cardColour, setCardColour] = useState("primary.light")
    const itemPosition: FactPosition = {rowIndex: props.rowIndex, columnIndex: props.columnIndex}

    return (
        <Box sx={{
            backgroundColor: cardColour,
            textAlign: 'center',
            height: 100,
            overflowWrap: 'break-word'
          }} 
          onClick={() => props.onItemSelect(props.factItem, itemPosition)}>{props.factItem.fact}</Box>
    )
}

function FactRow(props: UTurnCardRow) {
    return (
        <Grid container item spacing={1}>
            {props.factsRowData.map((fact, index) => (
                <Grid key={`Fact${index}`} item xs={2.4}>
                    <GridItem factItem={fact} 
                        rowIndex={props.rowIndex}
                        columnIndex={index}
                        onItemSelect={props.onItemSelect}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export const UTurnCard = (props: UTurnCardProps) => {
    return (
        <Container>
            <Grid container spacing={1}>
                {props.facts.map((factsRowData, index) => (
                    <FactRow key={`Row${index}`} 
                        rowIndex={index}
                        factsRowData={factsRowData}
                        onItemSelect={props.onItemSelect}
                    />
                ))}
            </Grid>
        </Container>
    );
}