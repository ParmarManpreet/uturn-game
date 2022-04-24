import { getGameStartState } from "./services/AdminStateService";

export const Admin = () => {
    return (
        <>
            <div>Admin Page</div>
            <button onClick={() => console.log(getGameStartState())}>Start</button>
        </>
    );
}