import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "..";

export const PlayerProfile = () => {
    const [isWaitingForStart, setIsWaitingForStart] = useState(false)
    const [isGameStarting, setIsGameStarting] = useState(false)

    function setupGameStartListeners() {
        const unsub = onSnapshot(doc(db, "GameStates", "GameStart"), (doc) => {
            if (doc.exists()) {
                setIsWaitingForStart(false)
                setIsGameStarting(doc.data().isGameStarted)
            }
        })
    
        return unsub
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
                <div>Fact #1</div>
                <input type="text"></input>
    
                <div>Fact #2</div>
                <input type="text"></input>

                <button onClick={() => setIsWaitingForStart(true)}>Submit</button>
            </>
        );
    }

    
}