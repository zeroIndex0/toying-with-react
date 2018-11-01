import React, { Component } from 'react';
import Square from './square';


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

export default Board;