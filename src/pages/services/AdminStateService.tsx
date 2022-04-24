import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../..";

export async function setGameStartState(isGameStated: boolean) {
    try {
        await setDoc(doc(db, "GameStates", "GameStart"), {
            isGameStated: isGameStated
        })
    } catch (error) {
        console.log(`Firestore could not set GameState to ${isGameStated}\n ${error}`)
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