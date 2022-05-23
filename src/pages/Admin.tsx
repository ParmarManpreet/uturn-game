import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { deleteAllScores } from "../services/ScoreService";
import { deleteAllPlayerProfiles } from "../services/PlayerProfileService";
import { deleteAllFacts } from "../services/FactService";
import { GameResetDialog } from "../components/dialogs/GameResetDialog";
import { useNavigate } from "react-router-dom";
import { updateGameStartState } from "../services/GameStatesService";
import { Button } from "@mui/material";

interface AdminProps {
    translate : (key: string) => string
}

export const Admin = (props: AdminProps) => {
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
                <h1>{props.translate('admin-title')}</h1>
                    <div>
                        <Button sx={{marginRight:2}} 
                            variant="contained"
                            onClick={handleGameResetDialogOpen}
                        >
                            {props.translate('admin-start-game')}
                        </Button>
                        <Button variant="contained" 
                            onClick={handleSettingsClick}
                        >
                            {props.translate('admin-settings')}
                        </Button>
                    </div>
                    <GameResetDialog open={isGameResetDialogShowing} 
                        onClose={handleGameResetDialogClose}
                        onReset={handleResetGame}
                    />
            </section>
            <Footer cardProgress={null}
                isScoreVisible={null}
                playerId={null}
                children={undefined!} 
                isScore={false}
            />        </>
    );
}

