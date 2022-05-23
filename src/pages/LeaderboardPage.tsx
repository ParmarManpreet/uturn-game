import { Avatar, Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getAllScores, ScoreGetDTO } from "../services/ScoreService";

interface LeaderboardPage {
    translate : (key: string) => string
}

export const LeaderboardPage = (props : LeaderboardPage) => {
    const emptyScoreDetails: Array<ScoreGetDTO> = []
    const [scoreDetails, setScoreDetails] = useState<Array<ScoreGetDTO>>(emptyScoreDetails)

    useEffect(() => {
        async function initializeScoreDetails() {
            const scoreDetails = await getAllScores()
            if (scoreDetails) {
                setScoreDetails(scoreDetails)
            }
        }

        initializeScoreDetails()
    }, [])

    return (
        <>
        <Navbar isAdmin={true} ></Navbar>
        <section className="home">
            <Container >
                <h1>{props.translate('leaderboard-title')}</h1> 
                <TableContainer component={Paper}>
                <Table aria-label="simple table" sx={{marginBottom:'500px'}}>
                    <TableHead>
                    <TableRow>
                        <TableCell><strong>{props.translate('leaderboard-rank')}</strong></TableCell>
                        <TableCell align="left"><strong>{props.translate('leaderboard-name')}</strong></TableCell>
                        <TableCell align="left"><strong>{props.translate('leaderboard-score')}</strong></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {scoreDetails.map((scoreDetail, index) => (
                        <TableRow key={index}>
                        <TableCell>
                            {index + 1}
                        </TableCell>
                        <TableCell align="left"> <Box sx={{display: 'flex', alignItems: 'center'}}><Avatar sx={{marginRight: 2}} src={scoreDetail.playerPicture}></Avatar><span id="leaderboard_text">{scoreDetail.playerName}</span></Box></TableCell>
                        <TableCell align="left">{scoreDetail.score}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Container>    
        </section>
        <Footer children={undefined!} ></Footer>
        </>
    );
}