import Button from "@mui/material/Button";
import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateGameStartState } from "../services/GameStatesService";
import {NavigationLink} from '../services/PageNavigationService'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { deleteAllScores } from "../services/ScoreService";
import { deleteAllPlayerProfiles } from "../services/PlayerProfileService";
import { deleteAllFacts } from "../services/FactService";
import { GameResetDialog } from "../components/dialogs/GameResetDialog";

export const Admin = () => {
    let navigate = useNavigate();

    const [isGameResetDialogShowing, setIsGameResetDialogShowing] = useState(false)

    const handleGameResetDialogOpen = () => {
        setIsGameResetDialogShowing(true)
    }

    const handleGameResetDialogClose = () => {
        setIsGameResetDialogShowing(false)
    }

    function handleResetGame() {
        deleteAllScores()
        deleteAllPlayerProfiles()
        deleteAllFacts()
        setIsGameResetDialogShowing(false)
        updateGameStartState(false)
        navigate('/number-players')
    }

    function handleSettingsClick() {
        navigate('/settings')
    }
    return (
        <>
            <Navbar isAdmin={true} ></Navbar>
            <section className="home">
                <h1>Admin Home Page</h1>
                    <div>
                        <Button sx={{marginRight:2}} variant="contained" onClick={handleGameResetDialogOpen}>Start</Button>
                        <Button variant="contained" onClick={handleSettingsClick}>Settings</Button>
                    </div>
                    <GameResetDialog open={isGameResetDialogShowing} 
                        onClose={handleGameResetDialogClose}
                        onReset={handleResetGame}
                    />
            </section>
        {/* <Footer children={undefined} ></Footer> */}
        </>
    );
}

