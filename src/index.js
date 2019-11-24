import React from 'react';
import { render } from "react-dom";
import { GameTicTacToe, Calculator, Dialog, SignUpDialog, FilterableProductTable, MemberSignUpForm, OuterClickExample } from "./lib";
import "./assets/styles/GlobalStyles.css"

const PRODUCTS = [
  {category: "Sporting Goods", id: 1, price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", id: 2, price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", id: 3, price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", id: 4, price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", id: 5, price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", id: 6, price: "$199.99", stocked: true, name: "Nexus 7"}
];

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h2>TicTacToe game</h2>
    <GameTicTacToe />
    <h2>Boiling point calculator in C and F scales</h2>
    <Calculator />
    <h2>Composition</h2>
    <Dialog title="Dialog title" message="Dialog description" color="primary" left="left" right="right" splitClass="flex primary" />
    <SignUpDialog title="Mars Exploration Program" message="How should we refer to you?"/>
    <FilterableProductTable products={PRODUCTS}/>
    <MemberSignUpForm />
    <OuterClickExample />
  </div>
);

render(<App />, document.getElementById("root"));
