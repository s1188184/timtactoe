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
  }


  handleClick(row, col) {


    if (!this.state.board[row][col]) {

      let newBoard = this.state.board.slice();
      newBoard[row][col] = this.state.turn;
      const nextTurn = this.state.turn === 'x' ? 'o' : 'x';
      this.setState({
        turn: nextTurn,
        board: newBoard
      });

      this.checkForWin();

    }
  }

  checkForWin() {



    // let win = '';
    // for (let r=0; r<3; r++) {
    //   if ( (board[r][0] === board[r][1] && board[r][1] === board[r][2]) ) {
    //     win = 'toprow';
    //   }
    // }
    
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <Space row={0} col={0} value={this.state.board[0][0]} onClick={this.handleClick} />
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
    );
  }
}
