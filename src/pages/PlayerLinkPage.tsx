import { Link, useLocation } from "react-router-dom";

// interface PlayerLinkPage {
//     numberOfFacts: number
// }

export const PlayerLinkPage = () => {
    const location = useLocation();
    const initialFactNumber = location.state
    // const initialFactNumber = location.state.numberOfFacts as string
    // const location = useLocation();
    // const initialGroupNumber : number = Number(location.state.numberOfFacts)
    
    return (
        <>
            <div>Player Link Page</div>
                <ul>
                    <Link
                        // to={{
                        //     pathname: "/player-profile",
                        //     // numberOfFacts: props.numberOfFacts // your data array of objects
                        // }}
                        to={"/player-profile"}
                        //key={initialFactNumber}
                        >Profile Page
                    </Link>
                </ul>
        </>

    );
}