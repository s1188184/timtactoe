import React from "react";
import ReactDOM from "react-dom";

import Piece from './Piece';

import './tictactoe.css';

export default class Space extends React.Component {
  constructor() {
    super();
    this.handleSpaceClick = this.handleSpaceClick.bind(this);
    this.handlePieceClick = this.handlePieceClick.bind(this);
  }

  handleSpaceClick() {
    this.props.onSpaceClick(this.props.id);
  }

  handlePieceClick(piece) {
    console.log('piece click');
    this.props.onPieceClick(piece)
  }

  render() {
    const { id, value, winner } = this.props;

    const winnerClass = winner ? ' winner' : '';

    const piece = value && value.length > 0 ? <Piece value={value[value.length - 1]} onClick={this.handlePieceClick} /> : undefined;

    const values = value.map(v => v.id);

    return (
      <div className={"space" + winnerClass} onClick={this.handleSpaceClick}>
        <div className="value">
          {piece}
          {/*
          <div className="moves">
            {values}
          </div>
          */}
        </div>
      </div>
    );
  }
}