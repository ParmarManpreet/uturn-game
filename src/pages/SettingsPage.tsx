import { Box, Button, IconButton, Input, styled, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FolderIcon from '@mui/icons-material/Folder';
import { getVisibleScoreState, updateVisibleScoreState } from "../services/GameStatesService";
import { storage } from "..";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import SettingService from "../services/SettingService";

interface SettingsProp {
    translate : (key: string) => string
}

export const SettingsPage = (props : SettingsProp) => {
    const [isScoreVisible, setIsScoreVisible] = useState(false);
    const [companyLogoURL, setCompanyLogoURL] = useState("")
    const [teamBuildLogoURL, setTeamBuildLogoURL] = useState("")
    const [hasRetreivedLogo, setHasRetreivedLogo] = useState(false)
    const types = ['image/png', 'image/jpeg'];
    const handleChangeVisibleScoreSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateVisibleScoreState(event.target.checked)
    setIsScoreVisible(event.target.checked);
    };
    const Input = styled('input')({
        display: 'none',
    });

    const handleTeamBuildingLogoUpdate = async (e: {target: { files: any; }; }) => {
        const file = e.target.files[0]

        if (file && types.includes(file.type)) {
            await uploadTeamBuildingLogo(file)
        } else {
            return;
        }
    }

    const handleCompanyLogoUpdate = async (e: {target: { files: any; }; }) => {
        const file = e.target.files[0]

        if (file && types.includes(file.type)) {
            await uploadCompanyLogo(file)
        } else {
            return;
        }
    }

    async function uploadTeamBuildingLogo(file : any) {
        const storageRef = ref(storage, `teamBuilding-logos/${file}`)
        //const fileURL = URL.createObjectURL(file)
        if (file) {
            const uploadResult = await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(uploadResult.ref)
            SettingService.setTeamBuildingLogo(downloadURL)
            setTeamBuildLogoURL(downloadURL)
            console.log("file: " + file)
            console.log("downlowd " + downloadURL)
        }
    }

    async function uploadCompanyLogo(file : any) {
        const storageRef = ref(storage, `company-logos/${file}`)
        if (file) {
            const uploadResult = await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(uploadResult.ref)
            SettingService.setCompanyLogo(downloadURL)
            setCompanyLogoURL(downloadURL)
            console.log("file: " + file)
            console.log("downlowd " + downloadURL)
        }
    }

async function initializeTeamBuildLogo() {
    try {
        const url = await SettingService.getTeamBuildingLogo()
        if(url) {
            setTeamBuildLogoURL(url)
        }
        setHasRetreivedLogo(true)
    } catch (error) {
        console.log(error)
    }
}

async function initializeCompanyLogo() {
    try {
        const url = await SettingService.getCompanyLogo()
        if(url) {
            setCompanyLogoURL(url)
        }
        setHasRetreivedLogo(true)
    } catch (error) {
        console.log(error)
    }
}

    useEffect(() => {
        async function initializeIsScoreVisible() {
            const fetchedIsScoreVisible = await getVisibleScoreState() 
            if(fetchedIsScoreVisible) {
                setIsScoreVisible(fetchedIsScoreVisible)
            }
        }
        initializeTeamBuildLogo()
        initializeCompanyLogo()
        initializeIsScoreVisible()
    }, [])

    return (
        <>
            <Navbar isAdmin={true} />
            <section className="home">
                <h1>{props.translate('settings-title')}</h1>
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margingBottom: '200px',
                        }}
                >   
                <span>{props.translate('settings-score')}</span>
                <Switch aria-label= 'Switch for Score Visibility'
                    onChange={(e) => handleChangeVisibleScoreSwitch(e)}
                    checked={isScoreVisible}
                    sx={{
                        marginBottom: '20px'
                    }}
                    
                    />
                </Box>

                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margingBottom: '200px',
                        }}
                > 
                    <span>{props.translate('settings-teambuildlogo')}</span>
                    {hasRetreivedLogo? <img src={teamBuildLogoURL} height="32" alt="Logo"/>: null}
                    <label>
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleTeamBuildingLogoUpdate} />
                    <IconButton 
                        sx={{
                            marginBottom: '20px',
                            color: 'white',
                        }}
                        aria-label="upload picture" 
                        component="span">
                        <FolderIcon />
                    </IconButton>
                </label>
                </Box>

                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margingBottom: '200px',
                        }}
                > 
                    <span color="white">{props.translate('settings-clientlogo')}</span>
                    {hasRetreivedLogo? <img src={companyLogoURL} height="32" alt="Logo"/>: null}
                    <label>
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleCompanyLogoUpdate} />
                    <IconButton 
                        sx={{
                            marginTop: '8px',
                            color: 'white',
                        }}
                        aria-label="upload picture" 
                        component="span">
                        <FolderIcon />
                    </IconButton>
                </label>
                </Box>
            </section>
            <Footer cardProgress={null}
                isScoreVisible={null}
                playerId={null}
                children={undefined!} 
                isScore={false}
            />
        </>
    );
}