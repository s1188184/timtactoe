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
    this.props.onClick(this.props.row, this.props.col);
  }

  render() {
    const { row, col } = this.props;
    return (
      <div className="space" onClick={this.handleClick}>
        <div className="value">
          {this.props.value}
          {/* {id[0]}, {id[1]} */}
        </div>
      </div>
    );
  }
}