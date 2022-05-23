import { addDoc, collection, deleteDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
import { db } from ".."
import { prettyPrintScoreDetailsDTO } from "../utils/PrettyPrintService"

export interface ScoreCreateDTO {
    playerId: string
    playerName: string
    playerPicture: string
    score: number
}

export interface ScoreGetDTO {
    playerName: string
    playerPicture: string
    score: number
}

export async function createScore(scoreDetails: ScoreCreateDTO)  {
    try {
        const scores = collection(db, "Scores")
        await addDoc(scores, {
            playerPicture: scoreDetails.playerPicture,
            playerName: scoreDetails.playerName,
            playerId: scoreDetails.playerId,
            score: scoreDetails.score
        })
        console.log(`Successfully Created score entry with score details: ${prettyPrintScoreDetailsDTO(scoreDetails)}`)
    } catch(error) {
        console.log(`Firestore could not create profile with player details: ${prettyPrintScoreDetailsDTO(scoreDetails)}\n ${error}`)
    }
}

export async function updateScore(id: string, score: number) {
    try {
        const scores = collection(db, "Scores")
        const queryOfScores = query(scores, where("playerId", "==", id))
        const querySnapshot = await getDocs(queryOfScores)
        for(const document of querySnapshot.docs) {
            if (document.data()) {
                await updateDoc(document.ref, {
                    score:score
                })
            }
        }
        console.log(`Successfully Updated Score for player Id ${id}`)
    } catch (error) {
        console.log(`Firestore could not update Score for player Id ${id}\n ${error}`)
    }
}

export async function getAllScores() {
    try {
        const scoresRef = collection(db, "Scores")
        const sortedScoresQuery = query(scoresRef, orderBy("score", "desc"));
        const scoreDocs = await getDocs(sortedScoresQuery)
        let scores: Array<ScoreGetDTO> = []
        for(const scoreDoc of scoreDocs.docs) {
            if (scoreDoc.data()) {
                const scoreDetails: ScoreGetDTO = {
                    playerName: scoreDoc.data().playerName,
                    playerPicture: scoreDoc.data().playerPicture,
                    score: scoreDoc.data().score
                }
                scores.push(scoreDetails)
            }
        }
        console.log(`Successfully Got all Score Details`)
        return scores
    } catch (error) {
        console.log(`Firestore could not Get All Score Details\n ${error}`)
    }
}

export async function deleteAllScores() {
    try {
        const scoresRef = collection(db, "Scores")
        const querySnapshot = await getDocs(scoresRef)
        for(const document of querySnapshot.docs) {
            deleteDoc(document.ref);
        }
        console.log(`Successfully Deleted all Score Details`)
    } catch(error) {
        console.log(`Firestore failed to retrieve all the documents\n ${error}`)
    }
}