import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from 'qrcode';
import { updateGameStartState } from "../services/GameStatesService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface PlayerLinkProp {
    translate : (key: string) => string
}

export const PlayerLinkPage = (props : PlayerLinkProp) => {
    // const domain = 'https://uturn-78fe1.web.app'
    const domain = 'https://u-turn-development.web.app'
    const location =  useLocation();
    const factState: any = location.state
    const factNumber: number = factState.numberOfFacts
    const [imageUrl, setImageUrl] = useState('')

    let navigate = useNavigate();

    const redirectLeaderboardPage = () => {
        navigate('/leaderboard')
    }

    function startGame() {
        updateGameStartState(true)
    }

    function endGame() {
        updateGameStartState(false)
        redirectLeaderboardPage()
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
        <section className="home">
            <Navbar isAdmin={false}/>
            <h1>{props.translate('player-links-title')}</h1>
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
                    <h2>{props.translate('player-links-qr')}</h2>
                    <img src={imageUrl} alt="img"/>
                </div>
                <Button variant="contained" onClick={() => startGame()}>{props.translate('player-links-start')}</Button>
                <Button sx={{marginTop:"8px", marginBottom:"100px"}} variant="contained" disableElevation onClick={() => endGame()}>{props.translate('player-links-end')}</Button>
            </Box>
            <Footer cardProgress={null}
                isScoreVisible={null}
                playerId={null}
                children={undefined!} 
                isScore={false}
            />        </section>
        
    );
}