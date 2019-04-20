import React from "react";

import Space from './Space';

import 'bootstrap/dist/css/bootstrap.css';
import './tictactoe.css';

export default class TicTacToe extends React.Component {

  constructor() {
    super();
    this.state = {
      xPieces: [
        { id: 'x11', player: 'x', size: 1 },
        { id: 'x12', player: 'x', size: 1 },
        { id: 'x21', player: 'x', size: 2 },
        { id: 'x22', player: 'x', size: 2 },
        { id: 'x31', player: 'x', size: 3 },
        { id: 'x32', player: 'x', size: 3 },
      ],
      oPieces: [
        { player: 'o', size: 1 },
        { player: 'o', size: 1 },
        { player: 'o', size: 2 },
        { player: 'o', size: 2 },
        { player: 'o', size: 3 },
        { player: 'o', size: 3 },
      ],
      board: [[], [], [], [], [], [], [], [], []],
      turn: 'x',
      selected: null,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }


  handleClick(space) {

    if (!this.state.winner && this.state.board[space].length < 3) {

      let newBoard = this.state.board.slice();
      newBoard[space].push(this.state.turn);
      const nextTurn = this.state.turn === 'x' ? 'o' : 'x';

      const winner = this.checkForWin(newBoard);

      this.setState({
        turn: nextTurn,
        board: newBoard,
        winner
      });


    }
  }

  handleSelectPiece(id) {
    
  }

  handleReset() {
    this.setState({
      board: [[], [], [], [], [], [], [], [], []],
      turn: 'x',
      winner: undefined
    });

  }

  checkForWin(board) {

    // winning combos
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];


    // get current board
    const currentBoard = board.map(space => {
      return space[space.length - 1];
    });


    for (let combo of winningCombos) {

      if (currentBoard[combo[0]] === 'x' &&
        currentBoard[combo[1]] === 'x' &&
        currentBoard[combo[2]] === 'x') {
        return {
          player: 'x',
          combo
        };
      }

      if (currentBoard[combo[0]] === 'o' &&
        currentBoard[combo[1]] === 'o' &&
        currentBoard[combo[2]] === 'o') {
        return {
          player: 'o',
          combo
        };
      }
    }

    return undefined;
  }

  render() {

    const { xPieces, winner } = this.state;

    let winningCombo = [];
    if (winner) {
      winningCombo = winner.combo;
    }


    const xPiecesComponents = xPieces.map(piece => {
      return (<a key={piece.id} href="#" onClick={()=>this.handleSelectPiece(piece.id)}>{piece.id}</a>);
    });

    debugger;


    return (
      <div>

        X Pieces:
        <div className="pieces">
          {xPiecesComponents}
        </div>


        <div className="board">
          <div className="roe">
            <div className="column">
              <Space id="0" winner={winningCombo.includes(0)} value={this.state.board[0]} onClick={this.handleClick} />
            </div>
            <div className="column">
              <Space id="1" winner={winningCombo.includes(1)} value={this.state.board[1]} onClick={this.handleClick} />
            </div>
            <div className="column">
              <Space id="2" winner={winningCombo.includes(2)} value={this.state.board[2]} onClick={this.handleClick} />
            </div>
          </div>
          <div className="roe">
            <div className="column">
              <Space id="3" winner={winningCombo.includes(3)} value={this.state.board[3]} onClick={this.handleClick} />
            </div>
            <div className="column">
              <Space id="4" winner={winningCombo.includes(4)} value={this.state.board[4]} onClick={this.handleClick} />
            </div>
            <div className="column">
              <Space id="5" winner={winningCombo.includes(5)} value={this.state.board[5]} onClick={this.handleClick} />
            </div>
          </div>
          <div className="roe">
            <div className="column">
              <Space id="6" winner={winningCombo.includes(6)} value={this.state.board[6]} onClick={this.handleClick} />
            </div>
            <div className="column">
              <Space id="7" winner={winningCombo.includes(7)} value={this.state.board[7]} onClick={this.handleClick} />
            </div>
            <div className="column">
              <Space id="8" winner={winningCombo.includes(8)} value={this.state.board[8]} onClick={this.handleClick} />
            </div>
          </div>
        </div>
        <br />
        <button className="btn btn-secondary btn-lg btn-block" onClick={this.handleReset}>Reset</button>




        {!this.state.winner &&
          <div className="info">
            <br />
            Up next: {this.state.turn}
          </div>
        }

      </div>
    );
  }
}
