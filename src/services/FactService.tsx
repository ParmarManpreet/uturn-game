import { addDoc, collection} from "firebase/firestore";
import { db } from "..";
import { prettyPrintFactDetailsArray, prettyPrintPlayerProfileFactDetailsArray } from "../utils/PrettyPrintService";

export interface PlayerProfileFactModel {
    playerId: string
    playerName: string
    fact: string
}

interface FactModel {
    playerName: string,
    fact: string
}

export interface FactModelCreateDTO {
    playerName: string,
    facts: Array<string>
}

export async function createPlayerProfilesFacts(playerProfileFacts: Array<PlayerProfileFactModel>) {
    try {
        for await (const factDetail of playerProfileFacts) {
            const playerFactsRef = collection(db, "Profiles", factDetail.playerId, "Facts")
            addDoc(playerFactsRef, {
                playerId: factDetail.playerId,
                playerName: factDetail.playerName,
                fact: factDetail.fact
            })
            console.log(`Successfully Create Fact with Details: \n {playerId: ${factDetail.playerId}, playerName: ${factDetail.playerName}, fact:${factDetail.fact}}`)
        }
        
    } catch (error) {
        console.log(`Firestore could not create facts with details: ${prettyPrintPlayerProfileFactDetailsArray(playerProfileFacts)}\n ${error}`)
    }
}

export async function createFacts(factDetails: FactModelCreateDTO) {
    try {
        for await (const fact of factDetails.facts) {
            const playerFactsRef = collection(db, "Facts")
            addDoc(playerFactsRef, {
                playerName: factDetails.playerName,
                fact: fact
            })
            console.log(`Successfully Create Fact with Details: \n {playerName: ${factDetails.playerName}, fact:${fact}}`)
        }
    } catch (error) {
        console.log(`Firestore could not create facts with details: ${prettyPrintFactDetailsArray(factDetails)}\n ${error}`)
    }
}