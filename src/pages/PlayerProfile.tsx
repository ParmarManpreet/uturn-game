import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "..";
import { Box, Button, IconButton, TextField } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { createPlayerProfile, PlayerCreateDTO, updatePlayerURLToId } from "../services/PlayerProfileService";
import { createFacts, FactModelCreateDTO } from "../services/FactService";
import { Navigate } from "react-router-dom";
import { storage } from '../index';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

interface PlayerProfileProps {
    numberOfFacts: number
}

export const PlayerProfile = (props: PlayerProfileProps) => {
    const [isWaitingForStart, setIsWaitingForStart] = useState(false)
    const [isGameStarting, setIsGameStarting] = useState(false)
    const [name, setName] = useState("")
    const [facts, setFacts] = useState(initializeFacts(props.numberOfFacts))
    const [urlParameter, setUrlParameter] = useState("")
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const types = ['image/png', 'image/jpeg'];
    const Input = styled('input')({
        display: 'none',
      });

    const handleTakePicture = (e: { target: { files: any; }; }) => {
        let selected = e.target.files[0];
        console.log(selected);
    }
    
    const handleUploadPicture = (e: {target: { files: any; }; }) => {
    //e.preventDefault()
    const file = e.target.files[0]

    if (!file) return;
    if(file && types.includes(file.type)){

        const storageRef = ref(storage, `Profile_pictures/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on("state_changed",
            (snapshot) => {
            const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
            },
            (error) => {
            alert(error);
            },
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                //setImgUrl(downloadURL);
            });
            }
        );
    } else {
        return;
        //error
    }
    }
    function setupGameStartListeners() {
        const unsub = onSnapshot(doc(db, "GameStates", "GameStart"), (doc) => {
            if (doc.exists()) {
                setIsWaitingForStart(false)
                setIsGameStarting(doc.data().isGameStarted)
            }
        })
        return unsub
    }

    function initializeFacts(numberOfFacts: number) {
        const factList: Array<string> = []
        for (let i = 0; i < numberOfFacts; i++) {
            factList.push("")
        }
        return factList
    }

    function handleOnChangeFactInput(index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const factValue = e.target.value
        const clonedFacts = [...facts]
        clonedFacts[index] = factValue
        setFacts(clonedFacts)
    }

    function handleOnChangeNameInput(e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) {
        const nameValue = e.target.value
        setName(nameValue)
    }

    async function handlePlayerDetailsSubmitButton() {
        try {
            const isSucessful = await saveProfileInformation()
            setIsWaitingForStart(isSucessful)
        } catch(error) {
            console.log(error)
        }
    }

    async function saveProfileInformation() {
        let isSuccesful = false 
        const playerDetails: PlayerCreateDTO = {
            name: name,
            picture: "",
        }

        const playerId = await createPlayerProfile(playerDetails)
        
        if (playerId) {
            await updatePlayerURLToId(playerId)
            const factDetails: FactModelCreateDTO = {
                playerId: playerId,
                playerName: name,
                playerPicture: "",
                facts: facts,
            }
            await createFacts(factDetails)
            setUrlParameter(playerId)
            isSuccesful = true
        }

        return isSuccesful
    }


    useEffect(() =>{
        setupGameStartListeners()
    }, [])

    if (isWaitingForStart) {
        return (
            <div>Waiting...</div>
        )
    }
    
    else if (isGameStarting) {
        return (
            <Navigate to={`/uturn-page/${urlParameter}`} replace={true} />
        )
    } 
    
    else {
        return (
            <>
                <h1>Create Profile</h1>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                <TextField
                    id="player-name"
                    label="Enter your name"
                    type="string" 
                    variant="filled"
                    onChange={(e) => handleOnChangeNameInput(e)} value={name}
                />
                {facts.map((value, index) => (
                    <div key={index}>
                        <TextField
                            id="player-facts"
                            label={`Enter Fact #${index + 1}`}
                            type="string"
                            variant="filled"
                            onChange={(e) => handleOnChangeFactInput(index, e)}
                        />
                    </div>
                ))}
                <label htmlFor="folder-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleUploadPicture} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <FolderIcon />
                    </IconButton>
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleTakePicture} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                {/* <form>
                    <input type="file" onChange={handleSubmit} />
                </form> */}

                <Button  variant="contained" disableElevation onClick={() => handlePlayerDetailsSubmitButton()}>Submit</Button>
           
                </Box>
            </>
        );
    }

    
}