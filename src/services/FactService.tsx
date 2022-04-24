import { doc, updateDoc } from "firebase/firestore";
import { db } from "..";

export async function create(isGameStarted: boolean) {
    try {
        const gameStartDocRef = doc(db, "GameStates", "GameStart")
        await updateDoc(gameStartDocRef, {
            isGameStarted: isGameStarted
        })
        console.log(`Successfully updated isGameStarted to ${isGameStarted}`)
    } catch (error) {
        console.log(`Firestore could not set GameState to ${isGameStarted}\n ${error}`)
    }
}
