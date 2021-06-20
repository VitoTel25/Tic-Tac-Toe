import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const CIRCLE_PLAYER_VALUE = 'O'
const CROSS_PLAYER_VALUE = 'X'

const winCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value || ''}
    </button>
  );
}

const Board = () => {
  const [isCirclePlayer, setIsCirclePlayer] = useState(false)
  const [playLog, setPlayLog] = useState([])
  console.log('Board playLog: ', playLog);

  const checkWin = (pValue) => {
    const indexList = playLog.filter(item => item.value === pValue).map(item => item.index)
    const isWin = winCases.some(winCase => winCase.every(num => indexList.some(ii => ii === num)))
    return isWin
  }

  const generateWinner = () => {
    if (checkWin(CIRCLE_PLAYER_VALUE)) {
      return CIRCLE_PLAYER_VALUE
    } else if (checkWin(CROSS_PLAYER_VALUE)) {
      return CROSS_PLAYER_VALUE
    }
    return null
  }

  const playerValue = isCirclePlayer ? CIRCLE_PLAYER_VALUE : CROSS_PLAYER_VALUE
  const winner = generateWinner()
  const gameStatus = winner ? `Game over, ${winner} is winner` : `Next player: ${playerValue}`

  const renderSquare = (index) => {
    const value = playLog.find(item => item.index === index)?.value
    const handleClick = () => {
      if (value || winner) {
        return
      }
      setPlayLog((prevLog) => ([ ...prevLog, { index, value: playerValue } ]))
      setIsCirclePlayer(prev => !prev)
    }

    return (
      <Square value={value} onClick={handleClick} />
    )
  }

  return (
    <div>
      <div className="status">{gameStatus}</div>
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
    </div>
  );
}

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
