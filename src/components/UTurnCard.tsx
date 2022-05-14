import { QuestionMark } from "@mui/icons-material";
import { Avatar, Box, Grid, Paper, styled } from "@mui/material";
import { blue } from "@mui/material/colors";
import { FactModelGetDTO } from "../services/FactService";

export interface FactPosition {
    rowIndex: number
    columnIndex: number
}

interface UTurnCardItem {
    factItem: FactModelGetDTO
    cardItemProgress: boolean
    rowIndex: number
    columnIndex: number
    onCardItemSelectWhenTrue: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
    onCardItemSelectWhenFalse: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
}

interface UTurnCardProps {
    facts: FactModelGetDTO[][]
    cardProgress: boolean[][]
    onCardItemSelectWhenTrue: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
    onCardItemSelectWhenFalse: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
}

interface UTurnCardRow {
    factsRowData: FactModelGetDTO[],
    cardProgressRow: boolean[],
    rowIndex: number
    onCardItemSelectWhenTrue: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
    onCardItemSelectWhenFalse: (factDetails: FactModelGetDTO, cardPosition: FactPosition) => void
}

const ResizablePaper = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        padding: 1,
        height:'110px',
        fontSize: '0.8rem'
    },
    [theme.breakpoints.up('md')]: {
        padding: 2,
        height:'200px',
    }
}));

const ResizableAvatar = styled(Avatar)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width:'30px', 
        height:'30px',
    },
    [theme.breakpoints.up('md')]: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width:'60px', 
        height:'60px',
    }
}));

function FactItem(props: UTurnCardItem) {
    const itemPosition: FactPosition = {rowIndex: props.rowIndex, columnIndex: props.columnIndex}

    if (props.cardItemProgress) {
        return (
            <ResizablePaper 
                sx={{
                    backgroundColor: 'white',
                    textAlign: 'center',
                    overflow: 'hidden'
                }}
                onClick={() => props.onCardItemSelectWhenFalse(props.factItem, itemPosition)}
            >
                <Box 
                    sx={{
                        width:'100%', 
                        height:'30%', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <span className="card_text">
                        <strong>{props.factItem.playerName}</strong>
                    </span>
                </Box>
                <Box
                    sx={{
                        width:'100%', 
                        height:'30%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <ResizableAvatar src={props.factItem.playerPicture}>
                    </ResizableAvatar>
                </Box>
                <Box 
                    sx={{
                        height:'40%', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <span className="card_text">
                        {props.factItem.fact}
                    </span>
                </Box>
            </ResizablePaper>
        )
    }

    return (
        <ResizablePaper 
            sx={{
                backgroundColor: 'white',
                textAlign: 'center',
            }} 
            onClick={() => props.onCardItemSelectWhenTrue(props.factItem, itemPosition)}>
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width:'100%', 
                    height:'50%', 
                }}>
                <ResizableAvatar 
                    sx={{ 
                        bgcolor:blue[500]
                    }}>
                    <QuestionMark sx={{height:'70%', width:'70%'}}/>
                </ResizableAvatar>
            </Box>
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                    height: '50%'
                }}>
                <span className="card_text">
                    {props.factItem.fact}
                </span>
            </Box>
        </ResizablePaper>
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
                        onCardItemSelectWhenTrue={props.onCardItemSelectWhenTrue}
                        onCardItemSelectWhenFalse={props.onCardItemSelectWhenFalse}
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
                        onCardItemSelectWhenTrue={props.onCardItemSelectWhenTrue}
                        onCardItemSelectWhenFalse={props.onCardItemSelectWhenFalse}
                    />
                ))}
            </Grid>
        </>
    );
}