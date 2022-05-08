import "./App.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import _ from "lodash";
import { Start } from "./Start";
import { Header } from "./Header";
import { Table } from "rsuite";
import React from "react";

function App() {
  let [table, updateTable] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const player = useRef("X");

  const isRemiza = (table) => {
    let nr = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (table[i][j] != "") {
          nr++;
        }
      }
    }
    return nr == 9;
  };

  const hasWin = (player, table) => {
    //verificam liniile
    for (let row = 0; row < 3; row++) {
      if (
        table[row][0] === player &&
        table[row][1] === player &&
        table[row][2] === player
      )
        return true;
    }
    for (let column = 0; column < 3; column++) {
      if (
        table[0][column] === player &&
        table[1][column] === player &&
        table[2][column] === player
      )
        return true;
    }
    if (
      table[0][0] === player &&
      table[1][1] === player &&
      table[2][2] === player
    )
      return true;
    if (
      table[0][2] === player &&
      table[1][1] === player &&
      table[2][0] === player
    )
      return true;
    return false;
  };

  useEffect(() => {
    if (hasWin("X", table)) {
      updateScore([Score[0] + 1, Score[1]]);
      localStorage.setItem("Score", JSON.stringify([Score[0] + 1, Score[1]]));
      alert("A CASTIGAT X");
      updateTable([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
      player.current = "X";
    }
    if (hasWin("O", table)) {
      updateScore([Score[0], Score[1] + 1]);
      localStorage.setItem("Score", JSON.stringify([Score[0], Score[1] + 1]));
      alert("A CASTIGAT O");
      updateTable([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
      player.current = "X";
    }

    if (isRemiza(table)) {
      alert("REMIZA");
    }
    localStorage.setItem("Table", JSON.stringify(table));
  }, [table]);

  let click = (row, column) => {
    if (table[row][column] === "") {
      let newTable = _.cloneDeep(table);
      newTable[row][column] = player.current;
      updateTable(newTable);
      player.current = player.current === "X" ? "O" : "X";
    }
  };

  const generateCells = () => {
    let cellsArray = [];
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        cellsArray.push(
          <div
            className="cell"
            style={{ gridColumnStart: column + 1, gridRowStart: row + 1 }}
            onClick={() => click(row, column)}
          >
            {table[row][column]}
          </div>
        );
      }
    }
    return cellsArray;
  };
  let [isStarted, updateisStarted] = useState(localStorage.getItem("Start"));

  let [player1Name, updateplayer1Name] = useState(
    localStorage.getItem("Player1")
  );
  let [player2Name, updateplayer2Name] = useState(
    localStorage.getItem("Player2")
  );

  let startGame = (player1Name, player2Name) => {
    updateplayer1Name(player1Name);
    updateplayer2Name(player2Name);
    updateisStarted(true);
    localStorage.setItem("Player1", player1Name);
    localStorage.setItem("Player2", player2Name);
    localStorage.setItem("Score", JSON.stringify(Score));
    localStorage.setItem("Table", JSON.stringify(table));
    localStorage.setItem("Start", true);
  };

  let [Score, updateScore] = useState(
    JSON.parse(localStorage.getItem("Score"))
  );
  let resetGame = () => {
    updateplayer1Name("");
    updateplayer2Name("");
    updateisStarted(false);
    updateTable([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    updateScore([0, 0]);
    localStorage.setItem("Player1", player1Name);
    localStorage.setItem("Player2", player2Name);
    localStorage.setItem("Score", JSON.stringify(Score));
    localStorage.setItem("Table", JSON.stringify(table));
    localStorage.setItem("Start", false);
  };
  return (
    <div className="App">
      {!isStarted ? (
        <Start startGame={startGame}></Start>
      ) : (
        <div>
          <Header
            player1={player1Name}
            player2={player2Name}
            score={Score}
          ></Header>
          <div className="ttt-table">{generateCells()}</div>
          <button onClick={resetGame}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default App;
