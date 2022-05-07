import { useEffect, useState } from "react";
import { UTurnCard } from "../components/UTurnCard";
import { FactModel } from "../services/FactService";
import { getAllFactsNotFromCurrentPlayer } from "../services/FactService";

export const UturnPage = () => {
    const emptyFactList: FactModel[][] = []
    const [facts, setFacts] = useState(emptyFactList)

    console.log(facts)

    useEffect(() => {
        async function fetchAllPlayableFacts(playerId: string) {
            const playableFacts = await getAllFactsNotFromCurrentPlayer(playerId)
            if(playableFacts) {
                const shuffledFacts = shufflePlayableFacts(playableFacts)
                const shuffledFactsMatrix: FactModel[][] = mapFactsListToMatrix(shuffledFacts)
                setFacts(shuffledFactsMatrix)
            }
        }

        function shufflePlayableFacts(playableFacts: Array<FactModel>) {
            let playableFactsCopy = [...playableFacts]
            let shuffledFacts: Array<FactModel> = []
            for(let i = 0; i < 25; i++) {
                const currentTotalIndexes = playableFactsCopy.length - i
                const selectedIndex: number = Math.floor(Math.random() * currentTotalIndexes)
                const removedItem = playableFactsCopy.splice(selectedIndex, 1)[0]
                shuffledFacts.push(removedItem)
            }
            return shuffledFacts
        }

        function mapFactsListToMatrix(facts: Array<FactModel>): FactModel[][]{
            const numberOfRows = Math.ceil(facts.length / 5)
            const numberOfColumns = 5
            let factsMatrix: FactModel[][] = []
            for (let i = 0; i < numberOfRows; i++) {
                let rowValues: Array<FactModel> = []
                for (let j = 0; j < numberOfColumns; j++) {
                    rowValues.push(facts[i * 5 + j])
                }
                factsMatrix.push(rowValues)
            }
            return factsMatrix
        }

        fetchAllPlayableFacts("XR4MJZTHPDMjdeztyHvH")
    }, [])
    
    return (
        <UTurnCard facts={facts}/>
    )
}