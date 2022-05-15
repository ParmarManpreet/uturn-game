import { FactModelCreateDTO } from "../services/FactService";
import { PlayerCreateDTO } from "../services/PlayerProfileService";

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