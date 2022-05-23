import { Box, Container } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { db } from "..";
import { FactSummaryDialog } from "../components/dialogs/FactSummaryDialog";
import { GuessFactOwnerDialog } from "../components/dialogs/GuessFactOwnerDialog";
import Footer from "../components/Footer";
import { LoadingView } from "../components/LoadingView";
import Navbar from "../components/Navbar";
import { PlayerScore } from "../components/PlayerScore";
import { ScoreLegend } from "../components/ScoreLegend";
import { FactPosition, UTurnCard } from "../components/UTurnCard";
import { LangContext } from "../context/lang";
import { FactModelGetDTO } from "../services/FactService";
import { getAllFactsNotFromCurrentPlayer } from "../services/FactService";
import { getGameId, getVisibleScoreState } from "../services/GameStatesService";
import { getAllButCurrentPlayer, PlayerGetDTO } from "../services/PlayerProfileService";

export interface DialogInformation {
    factItem: FactModelGetDTO
    factPosition: FactPosition
}

interface UTurnPage {
    translate : (key: string) => string
}
export const UturnPage = (props : UTurnPage) => {
    const emptyFactList: FactModelGetDTO[][] = []
    const emptyFactOwnerList: Array<PlayerGetDTO> = []
    const emptyCardProgress: boolean[][] = []
    const emptyDialogInformation: DialogInformation = {factItem: {playerName: "", fact: "", playerPicture: "" }, factPosition: {rowIndex: -1, columnIndex: -1}}
    const {dispatch: { translate }} = useContext(LangContext);
    // Getting URL Parameters
    let params = useParams();
    const [url, setUrl] = useState("")

    // Loading State
    const [isLoading, setIsloading] = useState(true)
    const [isGameEnding, setIsGameEnding] = useState(false)

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

    // Game State for Score Visibility
    const [isScoreVisible, setIsScoreVisible] = useState(false)

    

    function updateCardProgress() {
        const copyOfCardProgress: boolean[][] = cloneCardProgress(cardProgress)
        copyOfCardProgress[previewedFactDialogDetails.factPosition.rowIndex][previewedFactDialogDetails.factPosition.columnIndex] = true
        localStorage.setItem("cardProgress", JSON.stringify(copyOfCardProgress))
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

                // Initialize playable facts
                localStorage.setItem("facts", JSON.stringify(shuffledFactsMatrix))
                setFacts(shuffledFactsMatrix)

                // Initialize card/ game progress
                const emptyCardProgress: boolean[][] = initializeCardProgress(shuffledFactsMatrix)
                localStorage.setItem("cardProgress", JSON.stringify(emptyCardProgress))
                setCardProgress(emptyCardProgress)

                setIsloading(false)
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

        async function fetchScoreVisibleGameState() {
            const fetchedIsScoreVisible = await getVisibleScoreState() 
            if(fetchedIsScoreVisible) {
                setIsScoreVisible(fetchedIsScoreVisible)
            }
        }

        function setupGameStartListeners() {
            const unsub = onSnapshot(doc(db, "GameStates", "GameStart"), (doc) => {
                if (doc.exists()) {
                    setIsGameEnding(!doc.data().isGameStarted)
                }
            })
            return unsub
        }

        async function isNewGame() {
            const gameId: string = await getGameId()
            const cacheGameId = localStorage.getItem("gameId")

            if (cacheGameId === null || gameId !== cacheGameId) {
                return true
            } else {
                return false
            }
        }

        async function setGameIdCache() {
            const gameId: string = await getGameId()
            localStorage.setItem("gameId", gameId)
        }

        async function initializeGame() {
            const playerHasCachedValues = localStorage.getItem("url") && localStorage.getItem("facts") && localStorage.getItem("cardProgress")
            const isCacheReloadRequired = await isNewGame()

            if (isCacheReloadRequired && params.playerURL) {
                setGameIdCache()
                localStorage.setItem("url", params.playerURL)
                setUrl(params.playerURL)
                fetchAllPlayableFacts(params.playerURL)
                fetchAllPlayerDetailsButCurrentPlayer(params.playerURL)
                fetchScoreVisibleGameState()
            }
            else {
                if (playerHasCachedValues) {
                    const url: string = localStorage.getItem("url")!
                    const facts: FactModelGetDTO[][] = JSON.parse(localStorage.getItem("facts")!)
                    const cardProgress: boolean[][] = JSON.parse(localStorage.getItem("cardProgress")!)
                    setFacts(facts)
                    setCardProgress(cardProgress)
                    setUrl(url)

                    fetchAllPlayerDetailsButCurrentPlayer(url)
                    fetchScoreVisibleGameState()
                    setIsloading(false)
                }

                // Not sure how to handle when someone has no playerURL and has no cached data. Currently they are stuck on the Loading Screen
                /*
                    Option 1: 
                */
            }
        }

        setupGameStartListeners()
        initializeGame()
        
    }, [params.playerURL])

    window.onpopstate = function () {
        window.history.go(1);
    };

    window.addEventListener("beforeunload", (ev) => {  
        ev.preventDefault();
        return ev.returnValue = 'Are you sure you want to close?';
    });
    
    if (isLoading) {
        return (
            <Box className="home">
                <LoadingView isWaitingForHost={false} translate={translate}/>
            </Box>
        )
    } 
    
    else if(isGameEnding) {
        return (
            <Navigate to={`/leaderboard`} replace={true} />
        )
    }
    
    else {
        return (
            <>
                <Navbar isAdmin={false}/>
                <Box className="home">
                    <h1>{props.translate('uturn-title')}</h1>
                    <Container>
                        <PlayerScore cardProgress={cardProgress}
                            isScoreVisible={isScoreVisible}
                            playerId={url}
                        />
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
                <Footer children={undefined!} isScore={isScoreVisible}></Footer>
            </>
        )
    }
}