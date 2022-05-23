import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from ".."
import { prettyPrintCreateDTO } from "../utils/PrettyPrintService"

export interface PlayerProfileModel {
    name: string
    picture: string
    url: string
}

export interface PlayerCreateDTO {
    name: string
    picture: string
}

export interface PlayerGetDTO {
    name: string
    picture: string
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

export async function getAllButCurrentPlayer(playerId: string) {
    try {
        const profiles = collection(db, "Profiles")
        const queryOfProfiles = query(profiles, where("url", "!=", playerId))
        const querySnapshot = await getDocs(queryOfProfiles)
        let playerProfiles: Array<PlayerGetDTO> = []
        for(const document of querySnapshot.docs) {
            if (document.data()) {
                const playerProfile: PlayerGetDTO = {
                    name: document.data().name,
                    picture: document.data().picture
                }
                playerProfiles.push(playerProfile)
            }
        }
        return playerProfiles
    } catch (error) {
        console.log(`Firebase was not able to get player that do not have the id: ${playerId}\n ${error}`)
    }
}

export async function deleteAllPlayerProfiles() {
    try {
        const profiles = collection(db, "Profiles")
        const queryOfProfiles = query(profiles)
        const querySnapshot = await getDocs(queryOfProfiles)
        for(const document of querySnapshot.docs) {
            deleteDoc(document.ref)
        }
        console.log(`Firebase Succesfully Deleted All the Player Profiles`)
    } catch (error) {
        console.log(`Firebase Was Not Able to Delete All the Player Profiles\n ${error}`)
    }
}