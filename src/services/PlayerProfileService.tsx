import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from ".."
import { prettyPrintCreateDTO } from "../utils/PrettyPrintService"
import { FactModel } from "./FactService"

export interface PlayerCreateDTO {
    name: string
    picture: string
    facts: Array<string>
}

export async function createPlayerProfile(playerDetails: PlayerCreateDTO) {
    try {
        let id = ""
        const playerId = await initializePlayerProfile(playerDetails)
        if (playerId) {
            id = playerId
        } else {
            throw new Error(`Player Id is Empty`)
        }
        return id 
    } catch (error) {
        console.log(`Firestore could not create profile with player details: ${prettyPrintCreateDTO(playerDetails)}\n ${error}`)
    }
}

async function initializePlayerProfile(playerDetails: PlayerCreateDTO) {
    try {
        const profiles = collection(db, "Profiles")
        const snapshot = await addDoc(profiles, {
            picture: playerDetails.picture,
            name: playerDetails.name,
            url: ""
        })
        console.log(`Successfully Created profile with player details: ${prettyPrintCreateDTO(playerDetails)}`)
        return snapshot.id
    } catch(error) {
        console.log(`Firestore could not create profile with player details: ${prettyPrintCreateDTO(playerDetails)}\n ${error}`)
    }
}

export async function updatePlayerURLToId(id: string) {
    try {
        const profile = doc(db, "Profiles", id)
        await updateDoc(profile, {
            url: id
        })
        console.log(`Successfully Updated profile url to ${id}`)
    } catch (error) {
        console.log(`Firestore could not update profile url to ${id}`)
    }
}

export async function getAllFactsNotFromCurrentPlayer(playerId: string) {
    try {
        let factsFromOtherPlayers: Array<FactModel>= []
        const factsRef = collection(db, "Facts")
        const queryOfFacts = query(factsRef, where("playerId", "!=", playerId))

        const querySnapshot = await getDocs(queryOfFacts)
        for(const document of querySnapshot.docs) {
            if (document.data()) {
                const playerFact: FactModel = {
                    playerId: document.data().playerId,
                    playerName: document.data().playerName,
                    fact: document.data().fact
                }
                factsFromOtherPlayers.push(playerFact)
            }
        }
        return factsFromOtherPlayers
    } catch(error) {
        console.log(`Firestore could not Filter Facts Not Belonging to player with id: ${playerId}`)
    }
}