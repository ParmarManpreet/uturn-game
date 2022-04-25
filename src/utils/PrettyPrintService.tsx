import { FactModelCreateDTO, PlayerProfileFactModel } from "../services/FactService";
import { PlayerCreateDTO } from "../services/PlayerProfileService";

export function prettyPrintCreateDTO(playerDetails: PlayerCreateDTO): string {
    return `\n{name: ${playerDetails.name}, picture: ${playerDetails.picture}}\n`
}

export function prettyPrintPlayerProfileFactDetailsArray(factDetails: Array<PlayerProfileFactModel>) {
    let printDetails = "\n Fact Details:[\n"
    for (const factDetail of factDetails) {
        printDetails = printDetails + `{playerId: ${factDetail.playerId}, playerName: ${factDetail.playerName}, fact:${factDetail.fact}}\n`
    }
    printDetails = printDetails + "]"
    return printDetails
}

export function prettyPrintFactDetailsArray(factDetails: FactModelCreateDTO) {
    let printDetails = `\n Fact Details:{ playerName: ${factDetails.playerName}\n[`
    for (const fact of factDetails.facts) {
        printDetails = printDetails + `${fact}\n`
    }
    printDetails = printDetails + "]"
    return printDetails
}