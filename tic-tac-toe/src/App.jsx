import { useState } from "react"
import confetti from "canvas-confetti"
import Square from "./components/Square"
import { TURNS } from "./utils/constants"
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"


function App() {

  const [board, setBoard] = useState(JSON.parse(window.localStorage.getItem('board')) || Array(9).fill(null))
  const [turn , setTurn] = useState(JSON.parse(window.localStorage.getItem('turn')) || TURNS.X)
  const [winner, setWinner] = useState(null) // null = no hay ganador. false = empate. true = ganador.

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {

    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn 
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
  <main className="board">
    <h1>Tic Tac Toe</h1>
    <button onClick={resetGame}>Reset del juego</button>
    <section className="game">
      {
        board.map((square, index) => {
          return ( 
            <Square 
              key={index}
              index={index}
              updateBoard={updateBoard}>
                {square}
            </Square>
          )
        })
      }
    </section>
    <section className="turn">
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>
    <WinnerModal winner={winner} resetGame={resetGame}/>
  </main>
  )
}

export default App
