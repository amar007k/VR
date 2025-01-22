import React, { useState } from "react";

export const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const renderSquare = (index) => {
    return (
      <button
        className="square"
        onClick={() => handleClick(index)}
        disabled={!!winner || board[index]}
      >
        {board[index]}
      </button>
    );
  };
  const handleClick = (index) => {
    console.log(index, "Click");
    if (board[index] != null) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!isXTurn);
    const winnerCombination = checkWinner(newBoard);
    if (winnerCombination) {
      setWinner(newBoard[winnerCombination[0]]);
    }
  };
  const checkWinner = (newBoard) => {
    const combination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < combination.length; i++) {
      const [a, b, c] = combination[i];
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[b] === newBoard[c]) {
        return combination[i];
      }
    }
    return null;
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setWinner(false);
  };
  return (
    <>
    <h2>Tictactoe Game</h2>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        {winner ? (
          <div>
            <p>{winner} Winner of this Game..</p>
            <button onClick={resetGame}>Reset Game</button>
          </div>
        ) : (
          !board.includes(null) && (
            <div>
              <p>It's draw!</p>
              <button onClick={resetGame}>Reset Game</button>
            </div>
          )
        )}
      </div>
    </>
  );
};
