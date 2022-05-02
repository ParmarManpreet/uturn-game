import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { FactModel } from "../services/FactService";

interface UTurnCardItem {
    factItem: FactModel
    rowIndex: number
    columnIndex: number
    updateGridItemSelected: (rowIndex: number, columnIndex: number) => void
}

interface UTurnCardProps {
    facts: FactModel[][]
}

interface UTurnCardRow {
    factsRowData: FactModel[],
    rowIndex: number
    updateGridItemSelected: (rowIndex: number, columnIndex: number) => void
}

function GridItem(props: UTurnCardItem) {
    const [cardColour, setCardColour] = useState("primary.light")

    function handleCorrectAnswer() {
        setCardColour("primary.dark")
        props.updateGridItemSelected(props.rowIndex, props.columnIndex)
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
                        updateGridItemSelected={props.updateGridItemSelected}
                        rowIndex={props.rowIndex}
                        columnIndex={index}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export const UTurnCard = (props: UTurnCardProps) => {
    const emptyBooleanMatrix: boolean[][] = []
    const [isGridItemSelected, setIsGridItemSelected] = useState(emptyBooleanMatrix)

    function updateGridItemSelected(rowIndex: number, columnIndex: number) {
        if (isGridItemSelected) {
            const copyOfGridItemSelected: boolean[][] = cloneGrid(isGridItemSelected)
            copyOfGridItemSelected[rowIndex][columnIndex] = true
            setIsGridItemSelected(copyOfGridItemSelected)
        }
        
    }

    function cloneGrid(factGrid: boolean[][]) {
        return factGrid.map((factRow) => [...factRow])
    }

    function initializeIsGridItemSelected(facts: FactModel[][]) {
        if (props.facts.length !== 0) {
            const numberOfRows = facts.length
            const numberOfColumns = facts[0].length
            let initialIsGridItemSelected: boolean[][] = []
            for (let i = 0; i < numberOfRows; i++) {
                let rowValues = []
                for (let j = 0; j < numberOfColumns; j++) {
                    rowValues.push(false)
                }
                initialIsGridItemSelected.push(rowValues)
            }
            setIsGridItemSelected(initialIsGridItemSelected)
        }
    }

    useEffect(() => {
        initializeIsGridItemSelected(props.facts)
    }, [props.facts])
    
    return (
        <Container>
            <Grid container spacing={1}>
                {props.facts.map((factsRowData, index) => (
                    <FactRow key={`Row${index}`} 
                        rowIndex={index}
                        factsRowData={factsRowData}
                        updateGridItemSelected={updateGridItemSelected}
                    />
                ))}
            </Grid>
        </Container>
    );
}