import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FactSummaryDialog } from "../components/dialogs/FactSummaryDialog";
import { GuessFactOwnerDialog } from "../components/dialogs/GuessFactOwnerDialog";
import { LoadingView } from "../components/LoadingView";
import { PlayerScore } from "../components/PlayerScore";
import { FactPosition, UTurnCard } from "../components/UTurnCard";
import { FactModelGetDTO } from "../services/FactService";
import { getAllFactsNotFromCurrentPlayer } from "../services/FactService";
import { getAllButCurrentPlayer, PlayerGetDTO } from "../services/PlayerProfileService";

export interface DialogInformation {
    factItem: FactModelGetDTO
    factPosition: FactPosition
}

export const UturnPage = () => {
    const emptyFactList: FactModelGetDTO[][] = []
    const emptyFactOwnerList: Array<PlayerGetDTO> = []
    const emptyCardProgress: boolean[][] = []
    const emptyDialogInformation: DialogInformation = {factItem: {playerName: "", fact: "", playerPicture: "" }, factPosition: {rowIndex: -1, columnIndex: -1}}

    // Getting URL Parameters
    let params = useParams();

    // Loading State
    const [isLoading, setIsloading] = useState(true)

    // Common Information
    const [facts, setFacts] = useState(emptyFactList)
    const [factOwnerDetails, setFactOwnerDetails] = useState(emptyFactOwnerList)
    const [cardProgress, setCardProgress] = useState(emptyCardProgress)

    // Fact for Dialog
    const [previewedFactDialogDetails, setPreviewedFactDialogDetails] = useState<DialogInformation>(emptyDialogInformation)
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false)
    const [openFactSummaryDialog, setOpenFactSummary] = useState(false)

    const handleFactSummaryDialogClose = () => setOpenFactSummary(false)
    const handleSubmitDialogClose = () => setOpenSubmitDialog(false)

    function updateCardProgress() {
        const copyOfCardProgress: boolean[][] = cloneCardProgress(cardProgress)
        copyOfCardProgress[previewedFactDialogDetails.factPosition.rowIndex][previewedFactDialogDetails.factPosition.columnIndex] = true
        setCardProgress(copyOfCardProgress)
    }

    function cloneCardProgress(factGrid: boolean[][]) {
        return factGrid.map((factRow) => [...factRow])
    }

    function handleFactSelectionForSubmission(factDetails: FactModelGetDTO, cardPosition: FactPosition) {
        selectFactForPreview(factDetails, cardPosition)
        setOpenSubmitDialog(true)
    }

    function handleFactSelectionForSummary(factDetails: FactModelGetDTO, cardPosition: FactPosition) {
        selectFactForPreview(factDetails, cardPosition)
        setOpenFactSummary(true)
    }

    function selectFactForPreview (factDetails: FactModelGetDTO, cardPosition: FactPosition) {
        const factDialogInformation: DialogInformation = {
            factItem: factDetails,
            factPosition: cardPosition
        }
        setPreviewedFactDialogDetails(factDialogInformation)
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
                const shuffledFactsMatrix: FactModelGetDTO[][] = mapFactsListToMatrix(shuffledFacts)
                setFacts(shuffledFactsMatrix)
                setIsloading(false)
                setCardProgress(initializeCardProgress(shuffledFactsMatrix))
            }
        }

        function shufflePlayableFacts(playableFacts: Array<FactModelGetDTO>) {
            let playableFactsCopy = [...playableFacts]
            let shuffledFacts: Array<FactModelGetDTO> = []
            for(let i = 0; i < 25; i++) {
                const currentTotalIndexes = playableFactsCopy.length - i
                const selectedIndex: number = Math.floor(Math.random() * currentTotalIndexes)
                const removedItem = playableFactsCopy.splice(selectedIndex, 1)[0]
                shuffledFacts.push(removedItem)
            }
            return shuffledFacts
        }

        function mapFactsListToMatrix(facts: Array<FactModelGetDTO>): FactModelGetDTO[][]{
            const numberOfRows = Math.ceil(facts.length / 5)
            const numberOfColumns = 5
            let factsMatrix: FactModelGetDTO[][] = []
            for (let i = 0; i < numberOfRows; i++) {
                let rowValues: Array<FactModelGetDTO> = []
                for (let j = 0; j < numberOfColumns; j++) {
                    rowValues.push(facts[i * 5 + j])
                }
                factsMatrix.push(rowValues)
            }
            return factsMatrix
        }

        function initializeCardProgress(facts: FactModelGetDTO[][]): boolean[][] {
            let initialIsGridItemSelected: boolean[][] = []
            if (facts.length !== 0) {
                const numberOfRows = facts.length
                const numberOfColumns = facts[0].length
                for (let i = 0; i < numberOfRows; i++) {
                    let rowValues = []
                    for (let j = 0; j < numberOfColumns; j++) {
                        rowValues.push(false)
                    }
                    initialIsGridItemSelected.push(rowValues)
                }
            }
            return initialIsGridItemSelected
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
            <Box className="home">
                <Container>
                    <PlayerScore cardProgress={cardProgress}/>
                    <UTurnCard facts={facts}
                        cardProgress={cardProgress}
                        onCardItemSelectWhenTrue={handleFactSelectionForSubmission}
                        onCardItemSelectWhenFalse={handleFactSelectionForSummary}
                    />
                    <GuessFactOwnerDialog selectedFact={previewedFactDialogDetails.factItem}
                        open={openSubmitDialog} 
                        onClose={handleSubmitDialogClose} 
                        factOwners={factOwnerDetails}
                        onSubmitCorrectAnswer={updateCardProgress}
                    />
                    <FactSummaryDialog
                        open={openFactSummaryDialog}
                        onClose={handleFactSummaryDialogClose}
                        selectedFact={previewedFactDialogDetails.factItem}
                    />
                </Container>
            </Box>
        )
    }
}