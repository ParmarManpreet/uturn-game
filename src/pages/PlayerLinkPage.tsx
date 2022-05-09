import { useLocation } from "react-router-dom";

export const PlayerLinkPage = () => {
    const location =  useLocation();
    const factState: any = location.state
    const factNumber: number = factState.numberOfFacts
    console.log(factState.numberOfFacts)
    
    return (
        <>
            <div>Player Link Page</div>
            <div> {`localhost:3000/player-profile/?factNumber=${factNumber}`} </div>
        </>
    );
}