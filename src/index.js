import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// Making Square a function component since it has no state
function Square(props) {
  if(!props.winner) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  } else {
    return (
      <button className="winning-square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
}


class Board extends Component {

  renderSquare(i) {
      //here is where i need to check if there is a winner and fi its matching
      //ahve to handle the null case
    // if(this.props.winner[0] === i || this.props.winner[1] === i || this.props.winner[2] === i) {
    if(this.props.winner !== null && (this.props.winner[0] === i || this.props.winner[1] === i || this.props.winner[2] === i)) {
      return (
        <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        winner={true}
        /> 
      );
    } else {
      return (
        <Square 
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
          winner={false}
        />
      );
    }
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

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }


  currentPlayer() {
    return this.state.xisNext ? 'X' : 'O';
  }

  handleClick(i) {
    //copies the array into a new arrayed named the same as the copy
    //but its just a copy. then we shove the copy data into the real one
    // seems a bit excessive, tbh
    //This is actually called 'Immutability' and is deemed important
    // since you might have something a lot more complex and might want
    // a better way to detect changes
    //It also allowes for 'time travel'
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    //ignore clicks if there is a winner or already a filled square
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.currentPlayer();
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xisNext: !this.state.xisNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xisNext: (step % 2) === 1,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let player = this.currentPlayer();
    let status;
    if(winner) {
      status = `Winner: ${current.squares[winner[0]]}`;
    } else {
      status = `Next player: ${player}`;
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ==================== Seperation of some sort ================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


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
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}