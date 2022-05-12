import Button from "@mui/material/Button";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { updateGameStartState } from "../services/GameStateService";
import {NavigationLink} from '../services/PageNavigationService'
import GameResetDialog from '../components/GameResetDialog'

function startGame() {
    updateGameStartState(true)
}


export const Admin = () => {
    const [isStarted, setIsStarted] = useState(false)
    const [isModalShowing, setIsModalShowing] = useState(false)
    
    function handleStart(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        if (isStarted) {
            e.preventDefault()
            setIsModalShowing(true)
        }  
    }
    return (
        <>
            <Fragment>
                <div>Admin Page</div>
                    <div>
                        <Button variant="contained" onClick={() => startGame()}>Start</Button>
                        <NavigationLink text={'Start Game'}path="/number-players" handleClick={handleStart}/>
                        <NavigationLink text={'Settings'} path="/settings" />
                        {/* <GameResetDialog show={isModalShowing} handleSubmit={handleSubmit} onHide={() => setIsModalShowing(false)}/> */}
                    </div>
            </Fragment>
        </>

    );
}

