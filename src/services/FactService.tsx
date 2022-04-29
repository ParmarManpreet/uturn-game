import { addDoc, collection} from "firebase/firestore";
import { db } from "..";
import { prettyPrintFactDetailsArray } from "../utils/PrettyPrintService";


interface FactModel {
    playerId: string, 
    playerName: string,
    fact: string
}

export interface FactModelCreateDTO {
    playerId: string, 
    playerName: string,
    facts: Array<string>
}

export async function createFacts(factDetails: FactModelCreateDTO) {
    try {
        for await (const fact of factDetails.facts) {
            const factItem: FactModel = {
                playerId: factDetails.playerId,
                playerName: factDetails.playerName,
                fact: fact
            }

            const playerFactsRef = collection(db, "Facts")
            addDoc(playerFactsRef, factItem)
            console.log(`Successfully Create Fact with Details: \n {playerName: ${factDetails.playerName}, fact:${fact}}`)
        }
    } catch (error) {
        console.log(`Firestore could not create facts with details: ${prettyPrintFactDetailsArray(factDetails)}\n ${error}`)
    }
}