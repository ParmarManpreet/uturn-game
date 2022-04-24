import { doc, setDoc } from "firebase/firestore"
import { db } from ".."

export interface PlayerCreateDTO {
    name: string
    picture: string
}

export async function createPlayerProfile(playerDetails: PlayerCreateDTO) {
    try {
        const player = doc(db, "Profiles", "Profile1")
        await setDoc(player, {
            picture: "",
            name: playerDetails.name
        })
        
        console.log(`Successfully Created profile for ${prettyPrintCreateDTO(playerDetails)}`)
    } catch (error) {
        console.log(`Firestore could not create profile with player details: ${prettyPrintCreateDTO(playerDetails)}\n ${error}`)
    }
}

function prettyPrintCreateDTO(playerDetails: PlayerCreateDTO): string {
    return `\n{name: ${playerDetails.name}, picture: ${playerDetails.picture}}\n`
}