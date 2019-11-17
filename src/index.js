import React from 'react';
import { render } from "react-dom";
import { GameTicTacToe, Calculator } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h2>TicTacToe game</h2>
    <GameTicTacToe />
    <h2>Boiling point calculator in C and F scales</h2>
    <Calculator />
  </div>
);

render(<App />, document.getElementById("root"));
