import React from 'react';


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


export default Square;