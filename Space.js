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
    const { id, winner } = this.props;

    const winnerClass = winner ? ' winner' : '';

    return (
      <div className={"space" + winnerClass} onClick={this.handleClick}>
        <div className="value">
          {this.props.value}
          {/* {id[0]}, {id[1]} */}
        </div>
      </div>
    );
  }
}