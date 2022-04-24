import { addDoc, collection } from "firebase/firestore";
import { db } from "..";
import { prettyPrintFactDetailsArray } from "../utils/PrettyPrintService";

export interface FactModel {
    playerId: string
    playerName: string
    fact: string
}

export async function createPlayerProfilesFacts(factDetails: Array<FactModel>) {
    try {
        for await (const factDetail of factDetails) {
            const playerFactsRef = collection(db, "Profiles", factDetail.playerId, "Facts")
            addDoc(playerFactsRef, {
                playerId: factDetail.playerId,
                playerName: factDetail.playerName,
                fact: factDetail.fact
            })
            console.log(`Successfully Create Fact with Details: \n {playerId: ${factDetail.playerId}, playerName: ${factDetail.playerName}, fact:${factDetail.fact}}`)
        }
        
    } catch (error) {
        console.log(`Firestore could not create facts with details: ${prettyPrintFactDetailsArray(factDetails)}\n ${error}`)
    }
}

