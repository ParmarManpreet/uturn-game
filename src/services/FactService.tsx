import { addDoc, collection, getDocs, query, where} from "firebase/firestore";
import { db } from "..";
import { prettyPrintFactDetailsArray } from "../utils/PrettyPrintService";


export interface FactModel {
    playerId: string
    playerName: string
    playerPicture: string
    fact: string
}

export interface FactModelGetDTO {
    playerName: string
    playerPicture: string
    fact: string
}

export interface FactModelCreateDTO {
    playerId: string
    playerName: string
    playerPicture: string
    facts: Array<string>
}

export async function createFacts(factDetails: FactModelCreateDTO) {
    try {
        for await (const fact of factDetails.facts) {
            const factItem: FactModel = {
                playerId: factDetails.playerId,
                playerName: factDetails.playerName,
                playerPicture: factDetails.playerPicture,
                fact: fact
            }

            const playerFactsRef = collection(db, "Facts")
            addDoc(playerFactsRef, factItem)
            console.log(`Successfully Create Fact with Details: \n { playerId: ${factDetails.playerId}, playerName: ${factDetails.playerName}, fact: ${fact} }`)
        }
    } catch (error) {
        console.log(`Firestore could not create facts with details: ${prettyPrintFactDetailsArray(factDetails)}\n ${error}`)
    }
}

export async function getAllFactsNotFromCurrentPlayer(playerId: string) {
    try {
        let factsFromOtherPlayers: Array<FactModelGetDTO>= []
        const factsRef = collection(db, "Facts")
        const queryOfFacts = query(factsRef, where("playerId", "!=", playerId))

        const querySnapshot = await getDocs(queryOfFacts)
        for(const document of querySnapshot.docs) {
            if (document.data()) {
                const playerFact: FactModelGetDTO = {
                    playerName: document.data().playerName,
                    playerPicture: document.data().playerPicture,
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