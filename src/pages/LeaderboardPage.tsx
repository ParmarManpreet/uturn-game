import { Avatar, Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllScores, ScoreGetDTO } from "../services/ScoreService";

export const LeaderboardPage = () => {
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
            <Container>
                <h1>Leaderboard</h1> 
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell><strong>Rank</strong></TableCell>
                        <TableCell align="left"><strong>Name</strong></TableCell>
                        <TableCell align="left"><strong>Score</strong></TableCell>
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
        </>
    );
}