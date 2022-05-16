import Button from "@mui/material/Button";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { updateGameStartState } from "../services/GameStatesService";
import {NavigationLink} from '../services/PageNavigationService'
import GameResetDialog from '../components/GameResetDialog'

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
            <section className="home">
                <h1>Admin Home Page</h1>
                    <div>
                        <NavigationLink text={'Start Game'}path="/number-players" handleClick={handleStart}/>
                        <NavigationLink text={'Settings'} path="/settings" />
                    </div>
            </section>
        </>

    );
}

