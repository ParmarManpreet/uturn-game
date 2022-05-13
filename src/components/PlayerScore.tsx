import { Box } from "@mui/material";
import { useEffect, useState } from "react"

interface PlayerScoreProps {
    cardProgress: boolean[][]
}

export const PlayerScore = (props: PlayerScoreProps) => {
    const [score, setScore] = useState(0)

    useEffect(() => {
        function areRowsComplete() {
            let areRowsComplete: Array<boolean> = []
            for(let rowIndex = 0; rowIndex < props.cardProgress.length; rowIndex++) {
                let isRowComplete = true
                for(let columnIndex = 0; columnIndex < props.cardProgress[0].length; columnIndex++) {
                    const cardItem = props.cardProgress[rowIndex][columnIndex]
                    if (cardItem === false){
                        isRowComplete = false
                        break;
                    }
                }
                areRowsComplete.push(isRowComplete)
            }
            return areRowsComplete
        }

        function areColumnsComplete() {
            let areColumnsComplete: Array<boolean> = []
            for(let rowIndex = 0; rowIndex < props.cardProgress.length; rowIndex++) {
                let isColumnComplete = true
                for(let columnIndex = 0; columnIndex < props.cardProgress[0].length; columnIndex++) {
                    const cardItem = props.cardProgress[columnIndex][rowIndex]
                    if (cardItem === false){
                        isColumnComplete = false
                        break;
                    }
                }
                areColumnsComplete.push(isColumnComplete)
            }
            return areColumnsComplete
        }

        function isRightUpDiagonalComplete() {
            let isRightUpDiagonalComplete = true
            for(let columnIndex = 0; columnIndex < props.cardProgress.length; columnIndex++) {
                // Minus one because the highest index is n-1 not n
                const rowIndex = props.cardProgress.length - 1 - columnIndex
                const cardItem = props.cardProgress[rowIndex][columnIndex]
                if (cardItem === false){
                    isRightUpDiagonalComplete = false
                    break;
                }
            }
            return isRightUpDiagonalComplete
        }

        function isRightDownDiagonalComplete(){
            let isRightDownDiagonalComplete = true
            for(let rowIndex = 0; rowIndex < props.cardProgress.length; rowIndex++) {
                const cardItem = props.cardProgress[rowIndex][rowIndex]
                console.log(cardItem)
                if (cardItem === false){
                    isRightDownDiagonalComplete = false
                    break;
                }
            }
            return isRightDownDiagonalComplete
        }


        function tallyScore() {
            let totalScore = 0
            for(const isRowComplete of areRowsComplete()) {
                if(isRowComplete) {
                    totalScore = totalScore + 100
                }
            }

            for(const isColumnComplete of areColumnsComplete()) {
                if (isColumnComplete) {
                    totalScore = totalScore + 100
                }
            }

            if (isRightUpDiagonalComplete()) {
                totalScore = totalScore + 500

            }
            
            if (isRightDownDiagonalComplete()) {
                totalScore = totalScore + 500
            }

            setScore(totalScore)
        }

        tallyScore()
        
    }, [props.cardProgress])

    return (
        <Box sx={{color: 'white', width: '100%', textAlign: 'center'}}> <h1>Score: {score}</h1> </Box>
    );
}