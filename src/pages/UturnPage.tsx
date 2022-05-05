import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GuessFactOwnerDialog } from "../components/dialogs/GuessFactOwnerDialog";
import { LoadingView } from "../components/LoadingView";
import { UTurnCard } from "../components/UTurnCard";
import { FactModel } from "../services/FactService";
import { getAllFactsNotFromCurrentPlayer } from "../services/FactService";
import { getAllButCurrentPlayer, PlayerGetDTO } from "../services/PlayerProfileService";

export const UturnPage = () => {
    const emptyFactList: FactModel[][] = []
    const emptyFactOwnerList: Array<PlayerGetDTO> = []
    const emptyFact: FactModel= {playerId: "", playerName: "", fact: ""}
    const [facts, setFacts] = useState(emptyFactList)
    const [factOwnerDetails, setFactOwnerDetails] = useState(emptyFactOwnerList)
    const [previewedFact, setPreviewedFact] = useState<FactModel>(emptyFact)
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false)
    const [isLoading, setIsloading] = useState(true)

    let params = useParams();

    console.log(facts)

    const handleSubmitDialogClose = () => setOpenSubmitDialog(false)

    function handleFactSelection(fact: FactModel) {
        setPreviewedFact(fact)
        setOpenSubmitDialog(true)
    }

    // Initalization of facts in the UseEffect
    useEffect(() => {
        async function fetchAllPlayerDetailsButCurrentPlayer(playerId: string) {
            const playerDetails = await getAllButCurrentPlayer(playerId)
            if(playerDetails) {
                const filteredPlayerDetails = filterDuplicateDetails(playerDetails)
                setFactOwnerDetails(filteredPlayerDetails)
            }
        }

        function filterDuplicateDetails(playerDetails: Array<PlayerGetDTO> ) {
            let distinctPlayerDetails: Array<PlayerGetDTO> = []
            let existingEntries: Map<string, number> = new Map()
            for(const playerDetail of playerDetails) {
                if(!existingEntries.get(playerDetail.name + playerDetail.picture)) {
                    existingEntries.set(playerDetail.name + playerDetail.picture, 1) 
                    distinctPlayerDetails.push(playerDetail)
                }
            }
            return distinctPlayerDetails
        }

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

        if (params.playerURL) {
            fetchAllPlayableFacts(params.playerURL)
            fetchAllPlayerDetailsButCurrentPlayer(params.playerURL)          
        }
    }, [params.playerURL])

    // Possibly hide the fetching with an animation
    if (isLoading) {
        return (
            <LoadingView/>
        )
    } else {
        return (
            <>
                <UTurnCard facts={facts} onItemSelect={handleFactSelection}/>
                <GuessFactOwnerDialog open={openSubmitDialog} onClose={handleSubmitDialogClose} factDetails={previewedFact} factOwners={factOwnerDetails}/>
            </>
        )
    }
}