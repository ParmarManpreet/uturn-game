import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "..";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, TextField, Tooltip } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { createPlayerProfile, PlayerCreateDTO, updatePlayerURLToId } from "../services/PlayerProfileService";
import { createFacts, FactModelCreateDTO } from "../services/FactService";
import { Navigate, useSearchParams } from "react-router-dom";
import { storage } from '../index';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import FaceIcon from '@mui/icons-material/Face';
import actress from './defaultAvatarTemp/actress.png';
import female from './defaultAvatarTemp/female.png';
import male from './defaultAvatarTemp/male.png';
import bolivianGirl from './defaultAvatarTemp/bolivian-girl.png';
import caveman from './defaultAvatarTemp/caveman.png';
import otherFemale from './defaultAvatarTemp/other-female.png';
import manager from './defaultAvatarTemp/manager.png';
import supportPerson from './defaultAvatarTemp/support-person.png';
import userMale from './defaultAvatarTemp/user-male.png';
import writeMale from './defaultAvatarTemp/writer-male.png';
import { createScore, ScoreCreateDTO } from "../services/ScoreService";
import { LoadingView } from "../components/LoadingView";

export const PlayerProfile = () => {
    const defaultAvatars = [
       actress,
       female,
       male,
       bolivianGirl,
       caveman,
       otherFemale,
       manager,
       supportPerson,
       userMale,
       writeMale
      ];
    
    const emptyFacts: Array<string> = []
    const [isWaitingForStart, setIsWaitingForStart] = useState(false)
    const [isGameStarting, setIsGameStarting] = useState(false)
    const [name, setName] = useState("")
    const [facts, setFacts] = useState(emptyFacts)
    const [urlParameter, setUrlParameter] = useState("")
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const types = ['image/png', 'image/jpeg'];
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 50;
    let [searchParams] = useSearchParams();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleOpen = () => {
        console.log("on open clicked")
      };
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
    console.log("change")

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
    function handleSelectedIcon(){

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

            const scoreDetails: ScoreCreateDTO = {
                playerId: playerId,
                playerName: name,
                playerPicture: "",
                score: 0
            }
            await createScore(scoreDetails)

            setUrlParameter(playerId)
            isSuccesful = true
        }

        return isSuccesful
    }

    function areThereEmptyFields() {
        let fieldEmpty = false

        for(const fact of facts) {
            if(!fact) {
                fieldEmpty = true
                break
            }
        }

        if(!name) {
            fieldEmpty = true
        }
        return fieldEmpty
    }


    useEffect(() =>{
        function setupGameStartListeners() {
            const unsub = onSnapshot(doc(db, "GameStates", "GameStart"), (doc) => {
                if (doc.exists()) {
                    setIsWaitingForStart(false)
                    setIsGameStarting(doc.data().isGameStarted)
                }
            })
            return unsub
        }
    
        function initializeFacts() {
            const numberFactsQueryParam = searchParams.get('factNumber')
            let numberOfFacts: number = 0
            const factList: Array<string> = []
            if (numberFactsQueryParam) {
                numberOfFacts = parseInt(numberFactsQueryParam)
            }
            for (let i = 0; i < numberOfFacts; i++) {
                factList.push("")
            }
            setFacts(factList)
        }

        initializeFacts()
        setupGameStartListeners()
    }, [])

    if (isWaitingForStart) {
        return (
            <>
                <div className="home">
                    <LoadingView/>
                </div>
            </>
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
            <section className="home">
                <h1>Create Profile</h1>
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
                <TextField
                    sx={{'& label.Mui-focused': {
                        color: 'black',
                        },
                    }}
                    id="player-name"
                    label="Enter your name"
                    type="string" 
                    variant="filled"
                    onChange={(e) => handleOnChangeNameInput(e)} value={name}
                />
                {facts.map((value, index) => (
                    <div key={index}>
                        <TextField
                            sx={{'& label.Mui-focused': {
                                color: 'black',
                                },
                            }}
                            id="player-facts"
                            label={`Enter Fact #${index + 1}`}
                            type="string"
                            variant="filled"
                            onChange={(e) => handleOnChangeFactInput(index, e)}
                        />
                    </div>
                ))}
                </Box>
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                <label>
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleUploadPicture} />
                    <IconButton 
                        sx={{
                            color: 'white',
                        }}
                        aria-label="upload picture" 
                        component="span">
                        <FolderIcon />
                    </IconButton>
                    {/* <input type="file" onChange={handleUploadPicture} /> */}
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleTakePicture} />
                    <IconButton 
                        sx={{ 
                            color: 'white',
                            ml: 2 
                        }}
                        aria-label="upload picture" 
                        component="span">
                        <PhotoCamera />
                    </IconButton>
                    <Tooltip title="Default Avatars">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ 
                                ml: 2 
                            }}
                            aria-controls={open ? 'avatars-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            >
                            <FaceIcon 
                                sx={{ 
                                    color: 'white',
                                    fontSize: 27 
                                }}    
                            >
                            </FaceIcon>
                        </IconButton>
                        </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        open={open}
                        onClose={handleClose}
                        onClick={handleOpen}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT*4.5
                            },
                        elevation: 0,
                        sx: {
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                    {defaultAvatars.map((avatar) => (
                        <MenuItem key={avatar} onClick={handleSelectedIcon}>
                            <Avatar
                                src={avatar}>
                            </Avatar>
                        </MenuItem>
                    ))}
                    </Menu>
                </label>
                <Button  sx={{ color: 'white', marginTop: '8px' }}
                    id="factButton"
                    variant="contained" 
                    onClick={handlePlayerDetailsSubmitButton}
                    disabled={areThereEmptyFields()}
                >
                    Submit
                </Button>
                </Box>
            </section>
            </>
        );
    }    
}