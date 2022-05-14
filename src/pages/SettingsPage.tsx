import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
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
            <div>Settings</div>
            <span>Make Score Visible</span>
            <Switch aria-label= 'Switch for Score Visibility'
                onChange={(e) => handleChangeVisibleScoreSwitch(e)}
                checked={isScoreVisible}
            />
        </>

    );
}