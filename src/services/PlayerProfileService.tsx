import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
import { db } from ".."
import { prettyPrintCreateDTO, prettyPrintFacts } from "../utils/PrettyPrintService"
import { createPlayerProfilesFacts, FactModel } from "./FactService"

export interface PlayerCreateDTO {
    name: string
    picture: string
    facts: Array<string>
}

export async function createPlayerProfile(playerDetails: PlayerCreateDTO) {
    try {
        const playerId = await initializePlayerProfile(playerDetails)
        if (playerId) {
            await updatePlayerURLToId(playerId)
            await addFactsToPlayerProfile(playerId, playerDetails.name, playerDetails.facts)
        } else {
            throw new Error(`Player Id is Empty`)
        }
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

async function updatePlayerURLToId(id: string) {
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


async function addFactsToPlayerProfile(playerId: string, playerName: string, facts: Array<string>) {
    try {
        const factDetailList = mapPlayerCreateDetailstoFactList(playerId, playerName, facts)
        await createPlayerProfilesFacts(factDetailList)
    } catch (error) {
        console.log(`Firestore could not create facts for: ${prettyPrintFacts(facts)}\n`)
    }
}

function mapPlayerCreateDetailstoFactList(playerId: string, playerName: string, facts: Array<string>): Array<FactModel> {
    return facts.map((fact) => ({
        playerId: playerId,
        playerName: playerName,
        fact: fact
    }))
}