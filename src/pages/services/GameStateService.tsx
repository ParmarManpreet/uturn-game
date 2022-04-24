import { doc, getDoc, updateDoc,  } from "firebase/firestore";
import { db } from "../..";

export async function updateGameStartState(isGameStarted: boolean) {
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

export async function getGameStartState() {
    try {
        const gameStartDocRef = doc(db, "GameStates", "GameStart")
        const gameStartDocSnapshot = await getDoc(gameStartDocRef)

        if(gameStartDocSnapshot.exists()) {
            return gameStartDocSnapshot.data().isGameStarted
        }
    } catch (error) {
        console.log(`Firestore could not get GameState\n ${error}`)
    }
}