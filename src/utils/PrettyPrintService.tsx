import { FactModel } from "../services/FactService";
import { PlayerCreateDTO } from "../services/PlayerProfileService";

export function prettyPrintCreateDTO(playerDetails: PlayerCreateDTO): string {
    return `\n{name: ${playerDetails.name}, picture: ${playerDetails.picture}}\n`
}

export function prettyPrintFactDetailsArray(factDetails: Array<FactModel>) {
    let printDetails = "\n Fact Details:[\n"
    for (const factDetail of factDetails) {
        printDetails = printDetails + `{playerId: ${factDetail.playerId}, playerName: ${factDetail.playerName}, fact:${factDetail.fact}}\n`
    }
    printDetails = printDetails + "]"
    return printDetails
}

export function prettyPrintFacts(facts: Array<string>) {
    return facts.toString()
}