import React from "react";
import ReactDOM from "react-dom";

import Space from './Space';

import './tictactoe.css';

export default class TicTacToe extends React.Component {

  constructor() {
    super();
    this.state = {
      board: [
        [], [], []
      ],
      turn: 'x',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleClick(row, col) {


    if (!this.state.winner && !this.state.board[row][col]) {

      let newBoard = this.state.board.slice();
      newBoard[row][col] = this.state.turn;
      const nextTurn = this.state.turn === 'x' ? 'o' : 'x';
      this.setState({
        turn: nextTurn,
        board: newBoard
      });

      const winner = this.checkForWin();
      if (winner) {
        this.setState({ winner });
      }

    }
  }

  handleReset() {
    this.setState({
      board: [[], [], []],
      turn: 'x',
      winner: undefined
    });

  }

  checkForWin() {

    debugger;

    let { board } = this.state;

    // check rows
    for (let r = 0; r < 3; r++) {
      if (board[r][0] && board[r][1] && board[r][2] &&
        board[r][0] === board[r][1] &&
        board[r][1] === board[r][2]) {
        return {
          winner: board[r][0],
          spaces: [[r, 0], [r, 1], [r, 2]]
        };
      }
    }

    // check columns
    for (let c = 0; c < 3; c++) {
      if (board[0][c] && board[1][c] && board[2][c] &&
        board[0][c] === board[1][c] &&
        board[1][c] === board[2][c]) {
        return {
          winner: board[0][c],
          spaces: [[0, c], [1, c], [2, c]]
        };
      }
    }

    // check backslash
    if (board[0][0] && board[1][1] && board[2][2] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]) {
      return {
        winner: board[1][1],
        spaces: [[0, 0], [1, 1], [2, 2]]
      };
    }

    //check slash
    if (board[0][2] && board[1][1] && board[2][0] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]) {
      return {
        winner: board[1][1],
        spaces: [[0, 2], [1, 1], [2, 0]]
      };
    }

    return undefined;

  }

  render() {
    return (
      <div>
        <div className="board">
          <div className="row">
            <div className="col">
              <Space row={0} col={0} winner={this.state.winner} value={this.state.board[0][0]} onClick={this.handleClick} />
            </div>
            <div className="col">
              <Space row={0} col={1} value={this.state.board[0][1]} onClick={this.handleClick} />
            </div>
            <div className="col">
              <Space row={0} col={2} value={this.state.board[0][2]} onClick={this.handleClick} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Space row={1} col={0} value={this.state.board[1][0]} onClick={this.handleClick} />
            </div>
            <div className="col">
              <Space row={1} col={1} value={this.state.board[1][1]} onClick={this.handleClick} />
            </div>
            <div className="col">
              <Space row={1} col={2} value={this.state.board[1][2]} onClick={this.handleClick} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Space row={2} col={0} value={this.state.board[2][0]} onClick={this.handleClick} />
            </div>
            <div className="col">
              <Space row={2} col={1} value={this.state.board[2][1]} onClick={this.handleClick} />
            </div>
            <div className="col">
              <Space row={2} col={2} value={this.state.board[2][2]} onClick={this.handleClick} />
            </div>
          </div>
        </div>
        <button onClick={this.handleReset}>Reset</button>


        <div className="info">
          Turn: {this.state.turn}
        </div>


        {this.state.winner &&
          <div className="results">
            Winner: {this.state.winner.winner}
          </div>
        }
      </div>
    );
  }
}
