import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "..";
import { createPlayerProfile, PlayerCreateDTO } from "./services/PlayerProfileService";

interface PlayerProfileProps {
    numberOfFacts: number
}

export const PlayerProfile = (props: PlayerProfileProps) => {
    const [isWaitingForStart, setIsWaitingForStart] = useState(false)
    const [isGameStarting, setIsGameStarting] = useState(false)
    const [name, setName] = useState("")
    const [facts, setFacts] = useState(initializeFacts(props.numberOfFacts))

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

    function handleOnChangeFactInput(index: number, e: React.ChangeEvent<HTMLInputElement>) {
        const factValue = e.target.value
        const clonedFacts = [...facts]
        clonedFacts[index] = factValue
        setFacts(clonedFacts)
    }

    function handleOnChangeNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        const nameValue = e.target.value
        setName(nameValue)
    }

    function handlePlayerDetailsSubmitButton() {
        const playerDetails: PlayerCreateDTO = {
            name: name,
            picture: ""
        }
        createPlayerProfile(playerDetails)
        setIsWaitingForStart(true)
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
            <div>Game Starting</div>
        )
    } 
    
    else {
        return (
            <>
                <div>Player Profile Page</div>

                <div>Name</div>
                <input type="text" onChange={(e) => handleOnChangeNameInput(e)} value={name}></input>

                {facts.map((value, index) => (
                    <div key={index}>
                        <div>{`Fact #${index + 1}`}</div>
                        <input type="text" value={value} onChange={(e) => handleOnChangeFactInput(index, e)}></input>
                    </div>
                ))}

                <button onClick={() => handlePlayerDetailsSubmitButton()}>Submit</button>
            </>
        );
    }

    
}