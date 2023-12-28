import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
function App() {
 const[activePlayer,setActivePlayer]= useState("X");

 function handleActivePlayer(){
setActivePlayer((active)=>active === "X" ? "0" :"X")
 }

  return (
    <main>

      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol="X" isActive={activePlayer === "X"}></Player>
        <Player name="Player 2" symbol="0" isActive={activePlayer ==="0"}></Player>
       
        </ol>
        <GameBoard onSelectedSquare={handleActivePlayer} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
