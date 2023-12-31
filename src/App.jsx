import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import {WINNING_COMBINATIONS} from "./winning_combination"
import Log from "./components/log"
import GameOver from "./components/GameOver"


const initailGameBoardlArray =[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]



function derivedActivePlayer(gameTurns){
  let currentPlayer = "X"

  if(gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer ="0"
  }
  return currentPlayer;
}
function App() {

  const[players, setPlayers]= useState({
    X: "Player 1",
    0: "Player 2",
  })
const[gameTurns,setGameTurns] = useState([]);


const activePlayer=derivedActivePlayer(gameTurns);

let gameBoard = [...initailGameBoardlArray.map(array=>[...array])];
for(const turn of gameTurns){
   const { square,player}=turn;
   const{row,col}=square;

   gameBoard[row][col]=player;
}
let winner;
for(const combination of WINNING_COMBINATIONS){
  const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
  const thridSquareSymbol=gameBoard[combination[2].row][combination[2].column];
if(firstSquareSymbol && firstSquareSymbol==secondSquareSymbol && firstSquareSymbol==thridSquareSymbol){
  winner = players[firstSquareSymbol];
}

}

const hasDraw = gameTurns.length === 9 && !winner

 function handleActivePlayer(rowIndex,colIndex){

   setGameTurns((prevTurns)=>{

  const currentPlayer=derivedActivePlayer(prevTurns);
  

  const updateTurns =[{
    square : {row:rowIndex, col:colIndex},player:currentPlayer
  },...prevTurns];
 return updateTurns;
})
 }

 function handleRestart(){
  setGameTurns([]);
 }

 function handlePlayerName(symbol,newName){
  setPlayers(prevPlayer => {
    return {
    ...prevPlayer,
    [symbol]:newName
  };
});
 }

  return (
    <main>

      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerName}></Player>
        <Player name="Player 2" symbol="0" isActive={activePlayer ==="0"} onChangeName={handlePlayerName}></Player>
       
        </ol>
        {(winner|| hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectedSquare={handleActivePlayer} board ={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
