import React from "react";
import ReactDOM from "react-dom";

import Space from './Space';

import './tictactoe.css';

export default class TicTacToe extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    const { id, value, winner } = this.props;

    const winnerClass = winner ? ' winner' : '';

    return (
      <div className={"space" + winnerClass} onClick={this.handleClick}>
        <div className="value">
          {value[value.length - 1]}
          <div className="moves">
            {value}
          </div>
        </div>
      </div>
    );
  }
}