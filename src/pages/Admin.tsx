import { updateGameStartState } from "./services/GameStateService";

function startGame() {
    updateGameStartState(true)
}

export const Admin = () => {
    return (
        <>
            <div>Admin Page</div>
            <button onClick={() => startGame()}>Start</button>
        </>
    );
}