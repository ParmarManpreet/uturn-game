import React from "react";
import { Link } from "react-router-dom";
import { updateGameStartState } from "../services/GameStateService";

function startGame() {
    updateGameStartState(true)
}

function startGamePlay(){
    <Link to="/select-player" className="btn btn-primary"></Link>
}

export const Admin = () => {
    function handleStart(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        // if (isStarted) {
            e.preventDefault()
        //     setIsModalShowing(true)
        // }  
    }
    return (
        <>
            <div>Admin Page</div>
            <button onClick={() => startGame()}>Start</button>
            <Link to="/select-player">
                <button type="button" onClick={() => startGamePlay()}>Start Game</button>
            </Link>
            {/* //<NavigationLink text={'Start Game'}path="/select-groups" handleClick={handleStart}/> */}

        </>
    );
}

