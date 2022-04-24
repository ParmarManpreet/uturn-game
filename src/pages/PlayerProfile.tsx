import { useState } from "react";

export const PlayerProfile = () => {
    const [isWaitingForStart, setIsWaitingForStart] = useState(false)
    const [isGameStarting, setIsGameStarting] = useState(false)

    

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