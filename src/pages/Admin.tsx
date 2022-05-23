import Button from "@mui/material/Button";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { updateGameStartState } from "../services/GameStatesService";
import {NavigationLink} from '../services/PageNavigationService'
import GameResetDialog from '../components/GameResetDialog'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface AdminProps {
    translate : (key: string) => string
}

export const Admin = (props: AdminProps) => {
    // export const Admin = () => {
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
        <Navbar isAdmin={true} ></Navbar>
            <section className="home">
                {/* <h1>Admin Home Page</h1> */}
                <h1>{props.translate('admin-title')}</h1>
                    <div>
                        {/* <NavigationLink text={'Start Game'}path="/number-players" handleClick={handleStart}/>
                        <NavigationLink text={'Settings'} path="/settings" /> */}
                        <NavigationLink text={props.translate('admin-start-game')}path="/number-players" handleClick={handleStart}/>
                        <NavigationLink text={props.translate('admin-settings')} path="/settings" />
                    </div>
            </section>
        <Footer children={undefined!} ></Footer>
        </>
    );
}

