import React, { useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [turn, setTurn] = useState("X");
  const [cellState, setCellState] = useState(Array(9).fill(""));

  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);

  const [winner, setWinner] = useState();
  const checkMatchStatusUtil = (copyCells) => {
    let winModes = {
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
    };
    for (let i in winModes) {
      winModes[i].forEach((item) => {
        if (
          copyCells[item[0]] === "" ||
          copyCells[item[1]] === "" ||
          copyCells[item[2]] === ""
        ) {
          // do nothing
        } else if (
          copyCells[item[0]] === copyCells[item[1]] &&
          copyCells[item[1]] === copyCells[item[2]]
        ) {
          if (copyCells[item[0]] === "X") setPlayer1(player1 + 10);
          else setPlayer2(player2 + 10);
          setWinner(copyCells[item[0]]);
        }
      });
    }
  };

  const handleClickEvent = (id) => {
    let copyCells = [...cellState];
    if (cellState[id] !== "") {
      alert("Cannot change your move. Sorry!");
    } else {
      if (turn === "X") setTurn("O");
      else setTurn("X");

      copyCells[id] = turn;
      checkMatchStatusUtil(copyCells);
      setCellState(copyCells);
    }
  };

  const Cell = ({ id }) => {
    return <td onClick={() => handleClickEvent(id)}>{cellState[id]}</td>;
  };

  const handleNextGame = () => {
    setCellState(Array(9).fill(""));
    setWinner(null);
  };

  const handleRestartGame = () => {
    setCellState(Array(9).fill(""));
    setWinner(null);
    setPlayer1(0);
    setPlayer2(0);
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="mainBody">
        <div className="left">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Player X:</strong>
                </td>
                <td>{player1} Points</td>
              </tr>
              <tr>
                <td>
                  <strong>Player O:</strong>
                </td>
                <td>{player2} Points</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="right">
          <p>
            It's Player <strong>{turn}</strong>'s turn
          </p>
          <table>
            <tbody>
              <tr>
                <Cell id={0} />
                <Cell id={1} />
                <Cell id={2} />
              </tr>
              <tr>
                <Cell id={3} />
                <Cell id={4} />
                <Cell id={5} />
              </tr>
              <tr>
                <Cell id={6} />
                <Cell id={7} />
                <Cell id={8} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {winner && <p>{winner} is the winner! Well Done</p>}
      <div className="btnView">
        <button onClick={handleNextGame}>Next Game</button>
        <button onClick={handleRestartGame}>Play Again</button>
      </div>
    </div>
  );
}

export default Dashboard;
