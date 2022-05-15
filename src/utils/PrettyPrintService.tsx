import { FactModelCreateDTO } from "../services/FactService";
import { PlayerCreateDTO } from "../services/PlayerProfileService";
import { ScoreCreateDTO } from "../services/ScoreService";

export function prettyPrintCreateDTO(playerDetails: PlayerCreateDTO): string {
    return `\n{name: ${playerDetails.name}, picture: ${playerDetails.picture}}\n`
}

export function prettyPrintFactDetailsArray(factDetails: FactModelCreateDTO) {
    let printDetails = `\n Fact Details:{ playerName: ${factDetails.playerName}\n[`
    for (const fact of factDetails.facts) {
        printDetails = printDetails + `${fact}\n`
    }
    printDetails = printDetails + "]"
    return printDetails
}

export function prettyPrintScoreDetailsDTO(scoreDetails: ScoreCreateDTO) {
    let printDetails = `\n Score Details:{ playerName: ${scoreDetails.playerName}\n, 
        playerId: ${scoreDetails.playerId}\n, 
        playerPicture: ${scoreDetails.playerPicture}} \n`
    return printDetails
}