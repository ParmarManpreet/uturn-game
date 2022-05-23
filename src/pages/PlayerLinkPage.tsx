import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from 'qrcode';
import { updateGameStartState } from "../services/GameStatesService";
import Navbar from "../components/Navbar";

export const PlayerLinkPage = () => {
    const domain = 'https://u-turn-development.web.app'
    const location =  useLocation();
    const factState: any = location.state
    const factNumber: number = factState.numberOfFacts
    const [imageUrl, setImageUrl] = useState('')

    function startGame() {
        updateGameStartState(true)
    }

    function endGame() {
        updateGameStartState(false)
    }
    
    useEffect(() => {
        const generateQrCode = async () => {
            try {
                const response = await QRCode.toDataURL(`${domain}/player-profile/?factNumber=${factNumber}`);
                setImageUrl(response);
            }catch (error) {
            console.log(error);
            }
        }
        
        generateQrCode()
    },[factNumber]);

    return (
        <>
        <Navbar isAdmin={true} ></Navbar>
        <section className="home"> 
            <h1>Let's Start Playing!</h1>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& .MuiTextField-root': { m: 1, width: '25ch' , backgroundColor:'white'},
                }}
                noValidate
                autoComplete="off"
            >
                <div className="home__white_div"> {`${domain}/player-profile/?factNumber=${factNumber}`} </div>
                <div className="home__qrcode">
                    <h2>{('Scan Me')}</h2>
                    <img src={imageUrl} alt="img"/>
                </div>
                <Button variant="contained" onClick={() => startGame()}>Start UTurn!</Button>
                <Button sx={{marginTop:"8px", marginBottom:"10px"}} variant="contained" disableElevation onClick={() => endGame()}>End UTurn!</Button>
            </Box>
        </section>
        </>
    );
}