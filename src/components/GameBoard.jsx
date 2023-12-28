import { useState } from "react"

const initailGameBoardlArray =[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

export default function GameBoard({onSelectedSquare,activePlayerSymbol}){
const[gameBoard,setGameBoard] = useState(initailGameBoardlArray);

function handleChange(rowIndex,columnIndex){
setGameBoard((prevGameBoard)=>{
    const updatedBoard = [...prevGameBoard.map((innerArray)=>[...innerArray])]
    updatedBoard[rowIndex][columnIndex] = activePlayerSymbol
    return updatedBoard;
})
onSelectedSquare()
}

    return <ol id="game-board">
        {gameBoard.map((row,rowIndex)=> <li key={rowIndex}> <ol>
        {row.map((playerSymbol,columnIndex)=> <li key={columnIndex}><button onClick={()=>handleChange(rowIndex,columnIndex)}>{playerSymbol}</button> </li>)}
            </ol> </li>)}

    </ol>
}