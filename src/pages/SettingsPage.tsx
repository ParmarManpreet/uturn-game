import { Box, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getVisibleScoreState, updateVisibleScoreState } from "../services/GameStatesService";

export const SettingsPage = () => {
    const [isScoreVisible, setIsScoreVisible] = useState(false);

    const handleChangeVisibleScoreSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateVisibleScoreState(event.target.checked)
        setIsScoreVisible(event.target.checked);
    };

    useEffect(() => {
        async function initializeIsScoreVisible() {
            const fetchedIsScoreVisible = await getVisibleScoreState() 
            if(fetchedIsScoreVisible) {
                setIsScoreVisible(fetchedIsScoreVisible)
            }
        }

        initializeIsScoreVisible()
    }, [])

    return (
        <>
            <Navbar isAdmin={true} ></Navbar>
            <section className="home">
                <h1>Settings</h1>
                <Box 
                    sx={{
                        alignItems: 'center',
                    }}
                >
                <span>Make Score Visible</span>
                <Switch aria-label= 'Switch for Score Visibility'
                    onChange={(e) => handleChangeVisibleScoreSwitch(e)}
                    checked={isScoreVisible}
                />
                </Box>
            </section>
        </>
    );
}