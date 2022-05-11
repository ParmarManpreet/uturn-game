import { Box, Container, Grid } from "@mui/material";
import { FactModelGetDTO } from "../services/FactService";
import { ScoreLegend } from "./ScoreLegend";

export interface FactPosition {
    rowIndex: number
    columnIndex: number
}

interface UTurnCardItem {
    factItem: FactModelGetDTO
    cardItemProgress: boolean
    rowIndex: number
    columnIndex: number
    onItemSelect: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
}

interface UTurnCardProps {
    facts: FactModelGetDTO[][]
    cardProgress: boolean[][]
    onItemSelect: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
}

interface UTurnCardRow {
    factsRowData: FactModelGetDTO[],
    cardProgressRow: boolean[],
    rowIndex: number
    onItemSelect: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
}

function FactItem(props: UTurnCardItem) {
    const itemPosition: FactPosition = {rowIndex: props.rowIndex, columnIndex: props.columnIndex}

    if (props.cardItemProgress) {
        return (
            <Box sx={{
                backgroundColor: "primary.dark",
                textAlign: 'center',
                height: 100,
                overflowWrap: 'break-word'
              }} 
            >{props.factItem.playerName}</Box>
        )
    }

    return (
        <Box sx={{
            backgroundColor: "primary.light",
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
                    <FactItem factItem={fact}
                        cardItemProgress={props.cardProgressRow[index]}
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
        <>
            <Grid container spacing={1}>
                {props.facts.map((factsRowData, index) => (
                    <FactRow key={`Row${index}`}
                        rowIndex={index}
                        factsRowData={factsRowData}
                        cardProgressRow={props.cardProgress[index]}
                        onItemSelect={props.onItemSelect}
                    />
                ))}
            </Grid>
            <ScoreLegend/>
        </>
    );
}