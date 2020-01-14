import React from 'react';
import { render } from "react-dom";
import {ThemeContext, themes} from './theme-context';
import { GameTicTacToe, Calculator, Dialog, SignUpDialog, FilterableProductTable, MemberSignUpForm, OuterClickExample, ThemeToggleButton, MultipleContextsExample, PortalParent } from "./lib";
import "./assets/styles/GlobalStyles.css"

const PRODUCTS = [
  {category: "Sporting Goods", id: 1, price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", id: 2, price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", id: 3, price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", id: 4, price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", id: 5, price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", id: 6, price: "$199.99", stocked: true, name: "Nexus 7"}
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };
        this.state = {
            theme: themes.light,
            // State also contains the updater function so it will
            // be passed down into the context provider
            toggleTheme: this.toggleTheme,
        };
    }

    render() {
        // The ThemedButton button inside the ThemeProvider
        // uses the theme from state while the one outside uses
        // the default dark theme
        return (
            <div style={{ width: 640, margin: "15px auto" }}>
                <h2>TicTacToe game</h2>
                <GameTicTacToe />
                <h2>Boiling point calculator in C and F scales</h2>
                <Calculator />
                <h2>Composition</h2>
                <Dialog title="Dialog title" message="Dialog description" color="primary" left="left" right="right" splitClass="flex primary" />
                <SignUpDialog title="Mars Exploration Program" message="How should we refer to you?"/>
                <hr/>
                <FilterableProductTable products={PRODUCTS}/>
                <h2>Accessibility examples</h2>
                <MemberSignUpForm />
                <hr/>
                <OuterClickExample />
                <h2>Context example</h2>
                <p>The entire state is passed to the provider.</p>
                <ThemeContext.Provider value={this.state}>
                    <ThemeToggleButton />
                </ThemeContext.Provider>
                <hr/>
                <p>Miltiple contexts example</p>
                <MultipleContextsExample value={this.state} signedInUser="Gero" theme="gero"/>
                <MultipleContextsExample value={this.state} signedInUser="Jello" theme="jello"/>
                <hr/>
                <h2>Portal example</h2>
                <PortalParent/>
            </div>
    );}
}

const root = document.getElementById('root');
render(<App {...(root.dataset)} />, root);