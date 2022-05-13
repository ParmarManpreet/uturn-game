import { QuestionMark } from "@mui/icons-material";
import { Avatar, Box, Grid, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";
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
            <Paper 
                sx={{
                    backgroundColor: 'white',
                    padding: 2,
                    height:'200px',
                    textAlign: 'center',
                    overflow: 'hidden'
                }}>
                <Box 
                    sx={{
                        width:'100%', 
                        height:'30%', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <strong>{props.factItem.playerName}</strong>
                </Box>
                <Box
                    sx={{
                        width:'100%', 
                        height:'30%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <Avatar 
                        sx={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width:'60px', 
                            height:'60px', 
                        }}>
                    </Avatar>
                </Box>
                <Box 
                    sx={{
                        height:'40%', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    {props.factItem.fact}
                </Box>
            </Paper>
        )
    }

    return (
        <Paper 
            sx={{
                backgroundColor: 'white',
                padding: 2,
                height:'200px',
                textAlign: 'center',
                overflow: 'hidden'
            }} 
            onClick={() => props.onItemSelect(props.factItem, itemPosition)}>
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width:'100%', 
                    height:'50%', 
                }}>
                <Avatar 
                    sx={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width:'60px', 
                        height:'60px', 
                        bgcolor:blue[500]
                    }}>
                    <QuestionMark/>
                </Avatar>
            </Box>
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    height: '50%'
                }}>
                {props.factItem.fact}
            </Box>
        </Paper>
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
            <Grid container sx={{marginTop:2, marginBottom:2}} spacing={1}>
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