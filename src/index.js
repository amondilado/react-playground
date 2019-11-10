import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { catchClause } from '@babel/types';

const initialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,      
  xIsNext: true,
};

function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  handleClick(i) {
    // ensure a clear record after “going back in time”. discard all incorrect "future" recorded moves
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'x' : 'o';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumbTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  resetGame() {
    this.setState({...initialState});
  }

  render() {
    const history = this.state.history;
    // return currently selected move, instead of the last one
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumbTo(move)}>{desc}</button>
        </li>
      );
    });

    let status,
        statusClassName = "status",
        gameOver = 9 < moves.length;

    if (winner) { 
      status = 'Winner: ' + winner;
      statusClassName+=" winner";

    } else if (gameOver) {
      status = 'Game over';
      statusClassName+=" game-over";

    } else { 
      status = 'Next player: ' + (this.state.xIsNext ? 'x' : 'o');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div className={statusClassName}>{status}</div>
          {9 >= moves.length 
            ? (<ol>{moves}</ol>)
            : (<button onClick={() => this.resetGame()}>Reset game</button>)
          }          
        </div>
      </div>
    );
  }
}
  
// ========================================
  
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// Calculate x vs o winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}