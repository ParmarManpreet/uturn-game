import { doc, getDoc, setDoc, updateDoc,  } from "firebase/firestore";
import { db } from "..";

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

export async function setGameId(gameId: string) {
    try {
        const gameIdDocRef = doc(db, "GameStates", "GameId") 
        await setDoc(gameIdDocRef, {
            gameId: gameId
        })
        console.log(`Successfully updated Game Id Game State to ${gameId}`)
    } catch (error) {
        console.log(`Firestore could not set Game Id Game State to ${gameId}\n ${error}`)
    }
}

export async function getGameId() {
    try {
        const gameIdDocRef = doc(db, "GameStates", "GameId") 
        const gameIdDocSnapshot = await getDoc(gameIdDocRef)

        if(gameIdDocSnapshot.exists()) {
            return gameIdDocSnapshot.data().gameId
        }
    } catch (error) {
        console.log(`Firestore could not get Game Id Game State\n ${error}`)
    }
}

export async function updateVisibleScoreState(isScoreVisible: boolean) {
    try {
        const gameStartDocRef = doc(db, "GameStates", "VisibleScore")
        await updateDoc(gameStartDocRef, {
            isScoreVisible: isScoreVisible
        })
        console.log(`Successfully updated isScoreVisible to ${isScoreVisible}`)
    } catch (error) {
        console.log(`Firestore could not set Visible Score State to ${isScoreVisible}\n ${error}`)
    }
}

export async function getVisibleScoreState() {
    try {
        const gameStartDocRef = doc(db, "GameStates", "VisibleScore")
        const gameStartDocSnapshot = await getDoc(gameStartDocRef)

        if(gameStartDocSnapshot.exists()) {
            return gameStartDocSnapshot.data().isScoreVisible
        }
    } catch (error) {
        console.log(`Firestore could not get VisibleScore State\n ${error}`)
    }
}