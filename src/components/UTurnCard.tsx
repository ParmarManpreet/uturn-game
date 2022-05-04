import { Box, Container, Grid } from "@mui/material";
import { useState } from "react";
import { FactModel } from "../services/FactService";

interface UTurnCardItem {
    factItem: FactModel
    rowIndex: number
    columnIndex: number
    updateCardProgress: (rowIndex: number, columnIndex: number) => void
    onItemSelect: (fact: string) => void
}

interface UTurnCardProps {
    facts: FactModel[][]
    onItemSelect: (fact: string) => void
}

interface UTurnCardRow {
    factsRowData: FactModel[],
    rowIndex: number
    updateCardProgress: (rowIndex: number, columnIndex: number) => void
    onItemSelect: (fact: string) => void
}

function GridItem(props: UTurnCardItem) {
    const [cardColour, setCardColour] = useState("primary.light")

    function handleCorrectAnswer() {
        setCardColour("primary.dark")
        props.updateCardProgress(props.rowIndex, props.columnIndex)
        props.onItemSelect(props.factItem.fact)
    }

    return (
        <Box sx={{
            backgroundColor: cardColour,
            textAlign: 'center',
            height: 100,
            overflowWrap: 'break-word'
          }} 
          onClick={handleCorrectAnswer}>{props.factItem.fact}</Box>
    )
}

function FactRow(props: UTurnCardRow) {
    return (
        <Grid container item spacing={1}>
            {props.factsRowData.map((fact, index) => (
                <Grid key={`Fact${index}`} item xs={2.4}>
                    <GridItem factItem={fact} 
                        updateCardProgress={props.updateCardProgress}
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
    const [cardProgress, setCardProgress] = useState(initializeCardProgress())

    function initializeCardProgress(): boolean[][] {
        let initialIsGridItemSelected: boolean[][] = []
        if (props.facts.length !== 0) {
            const numberOfRows = props.facts.length
            const numberOfColumns = props.facts[0].length
            for (let i = 0; i < numberOfRows; i++) {
                let rowValues = []
                for (let j = 0; j < numberOfColumns; j++) {
                    rowValues.push(false)
                }
                initialIsGridItemSelected.push(rowValues)
            }
        }
        return initialIsGridItemSelected
    }

    function updateCardProgress(rowIndex: number, columnIndex: number) {
        const copyOfCardProgress: boolean[][] = cloneCardProgress(cardProgress)
        copyOfCardProgress[rowIndex][columnIndex] = true
        setCardProgress(copyOfCardProgress)
    }

    function cloneCardProgress(factGrid: boolean[][]) {
        return factGrid.map((factRow) => [...factRow])
    }
    
    return (
        <Container>
            <Grid container spacing={1}>
                {props.facts.map((factsRowData, index) => (
                    <FactRow key={`Row${index}`} 
                        rowIndex={index}
                        factsRowData={factsRowData}
                        updateCardProgress={updateCardProgress}
                        onItemSelect={props.onItemSelect}
                    />
                ))}
            </Grid>
        </Container>
    );
}