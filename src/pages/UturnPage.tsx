import { useEffect, useState } from "react";
import { GuessFactOwnerDialog } from "../components/dialogs/GuessFactOwnerDialog";
import { LoadingView } from "../components/LoadingView";
import { UTurnCard } from "../components/UTurnCard";
import { FactModel } from "../services/FactService";
import { getAllFactsNotFromCurrentPlayer } from "../services/FactService";

export const UturnPage = () => {
    const emptyFactList: FactModel[][] = []
    const [facts, setFacts] = useState(emptyFactList)
    const [previewedFact, setPreviewedFact] = useState("")
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false)
    const [isLoading, setIsloading] = useState(true)

    console.log(facts)

    const handleSubmitDialogClose = () => setOpenSubmitDialog(false)

    function handleFactSelection(fact: string) {
        setPreviewedFact(fact)
        setOpenSubmitDialog(true)
    }

    // Initalization of facts in the UseEffect
    useEffect(() => {
        async function fetchAllPlayableFacts(playerId: string) {
            const playableFacts = await getAllFactsNotFromCurrentPlayer(playerId)
            if(playableFacts) {
                const shuffledFacts = shufflePlayableFacts(playableFacts)
                const shuffledFactsMatrix: FactModel[][] = mapFactsListToMatrix(shuffledFacts)
                setFacts(shuffledFactsMatrix)
                setIsloading(false)
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

    // Possibly hide the fetching with an animation
    if (isLoading) {
        return (
            <LoadingView/>
        )
    } else {
        return (
            <>
                <UTurnCard facts={facts} onItemSelect={handleFactSelection}/>
                <GuessFactOwnerDialog open={openSubmitDialog} onClose={handleSubmitDialogClose} factText={previewedFact}/>
            </>
        )
    }
}