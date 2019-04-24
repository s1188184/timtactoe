import React from "react";
import firebase from './firebase';

import Space from './Space';
import Piece from './Piece';

import 'bootstrap/dist/css/bootstrap.css';
import './tictactoe.css';



export default class TicTacToe extends React.Component {

  constructor() {
    super();
    this.state = {
      xPieces: [
        { id: 'x1.1', player: 'x', size: 1 },
        { id: 'x1.2', player: 'x', size: 1 },
        { id: 'x2.1', player: 'x', size: 2 },
        { id: 'x2.2', player: 'x', size: 2 },
        { id: 'x3.1', player: 'x', size: 3 },
        { id: 'x3.2', player: 'x', size: 3 },
      ],
      oPieces: [
        { id: 'o1.1', player: 'o', size: 1 },
        { id: 'o1.2', player: 'o', size: 1 },
        { id: 'o2.1', player: 'o', size: 2 },
        { id: 'o2.2', player: 'o', size: 2 },
        { id: 'o3.1', player: 'o', size: 3 },
        { id: 'o3.2', player: 'o', size: 3 },
      ],
      board: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: []
      },
      turn: 'x',
      selected: null,
    }
    this.handleSpaceClick = this.handleSpaceClick.bind(this);
    this.handlePieceClick = this.handlePieceClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const stateRef = firebase.database().ref('state');

    stateRef.child('turn').on('value', (snapshot) => {
      let turn = snapshot.val();
      if (!turn) {
        turn = 'x';
      }
      this.setState({ turn });
    });

    stateRef.child('xPieces').on('value', (snapshot) => {
      let xPieces = snapshot.val();
      if (!xPieces) {
        xPieces = [
          { id: 'x1.1', player: 'x', size: 1 },
          { id: 'x1.2', player: 'x', size: 1 },
          { id: 'x2.1', player: 'x', size: 2 },
          { id: 'x2.2', player: 'x', size: 2 },
          { id: 'x3.1', player: 'x', size: 3 },
          { id: 'x3.2', player: 'x', size: 3 },
        ];
      }
      this.setState({ xPieces });
    });

    stateRef.child('oPieces').on('value', (snapshot) => {
      let oPieces = snapshot.val();
      if (!oPieces) {
        oPieces = [
          { id: 'o1.1', player: 'o', size: 1 },
          { id: 'o1.2', player: 'o', size: 1 },
          { id: 'o2.1', player: 'o', size: 2 },
          { id: 'o2.2', player: 'o', size: 2 },
          { id: 'o3.1', player: 'o', size: 3 },
          { id: 'o3.2', player: 'o', size: 3 },
        ];
      }
      this.setState({ oPieces });
    });

    stateRef.child('board').on('value', (snapshot) => {
      let board = snapshot.val();
      if (!board) {
        board = {
          0: [],
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: []
        }
      }
      this.setState({ board });
    });

    stateRef.child('selected').on('value', (snapshot) => {
      let selected = snapshot.val();
      if (!selected) {
        selected = null;
      }
      this.setState({ selected });
    });

    stateRef.child('winner').on('value', (snapshot) => {
      let winner = snapshot.val();
      if (!winner) {
        winner = null;
      }
      this.setState({ winner });
    });

  }

  handleSpaceClick(space) {
    console.log('space click: ' + space);
    debugger;

    if (this.state.selected) {



      if (!this.state.winner && (!this.state.board[space] || this.state.board[space].length < 3)) {

        let topPiece = null;

        if (this.state.board[space]) {
          topPiece = this.state.board[space][this.state.board[space].length - 1];
        }


        if (!topPiece || topPiece.size < this.state.selected.size) {

          if (this.state.selected.space !== space) {

            let newBoard = Object.assign({}, this.state.board);
            let selectedPiece = Object.assign({}, this.state.selected);
            selectedPiece.space = space;
            if (!newBoard[space]) {
              newBoard[space] = [];
            }
            newBoard[space].push(selectedPiece);
            const nextTurn = this.state.turn === 'x' ? 'o' : 'x';

            const winner = this.checkForWin(newBoard);

            // this.setState({
            //   turn: nextTurn,
            //   board: newBoard,
            //   selected: null,
            //   winner
            // });

            debugger;
            const stateRef = firebase.database().ref('state');
            // stateRef.set({
            //   turn: nextTurn,
            //   board: newBoard,
            //   selected: null,
            //   winner: winner
            // });
            stateRef.child('turn').set(nextTurn);
            stateRef.child('board').set(newBoard);
            stateRef.child('selected').set(null);
            stateRef.child('winner').set(winner);


          }

        }


      }
    }
  }

  handlePieceClick(piece) {
    console.log('piece click ' + piece.id);
    debugger;

    if (this.state.turn === piece.player) {


      // if this piece is already selected then deselect.
      if (this.state.selected) {
        if (this.state.selected.id === piece.id) {
          // TODO: If the piece hasn't already been played you should be able to deselect it and readd to list.


        }

        // you just clicked a different piece when one was selected. do not do anything for this piece. let the space handle it.
        return;
      }


      // if piece has a space its already been played.
      let newBoard = Object.assign({}, this.state.board);

      if (piece.space) {
        // go to board and pop it off this space...
        newBoard[piece.space].pop();
      }

      // remove from list of unplayed pieces
      let newXPieces = this.state.xPieces.slice();
      let newOPieces = this.state.oPieces.slice();
      if (piece.player === 'x') {
        const pieceID = newXPieces.findIndex(p => p.id === piece.id);
        console.log(pieceID);
        if (pieceID >= 0) {
          newXPieces.splice(pieceID, 1);
        }
      }
      else {
        const pieceID = newOPieces.findIndex(p => p.id === piece.id);
        if (pieceID >= 0) {
          newOPieces.splice(pieceID, 1);
        }
      }



      // this.setState({
      //   selected: piece,
      //   board: newBoard,
      //   xPieces: newXPieces,
      //   oPieces: newOPieces
      // });

      const stateRef = firebase.database().ref('state');
      // stateRef.set({
      //   selected: piece,
      //   board: newBoard,
      //   xPieces: newXPieces,
      //   oPieces: newOPieces
      // });
      stateRef.child('selected').set(piece);
      stateRef.child('board').set(newBoard);
      stateRef.child('xPieces').set(newXPieces);
      stateRef.child('oPieces').set(newOPieces);

    }
  }

  handleReset() {
    // this.setState({
    //   xPieces: [
    //     { id: 'x1.1', player: 'x', size: 1 },
    //     { id: 'x1.2', player: 'x', size: 1 },
    //     { id: 'x2.1', player: 'x', size: 2 },
    //     { id: 'x2.2', player: 'x', size: 2 },
    //     { id: 'x3.1', player: 'x', size: 3 },
    //     { id: 'x3.2', player: 'x', size: 3 },
    //   ],
    //   oPieces: [
    //     { id: 'o1.1', player: 'o', size: 1 },
    //     { id: 'o1.2', player: 'o', size: 1 },
    //     { id: 'o2.1', player: 'o', size: 2 },
    //     { id: 'o2.2', player: 'o', size: 2 },
    //     { id: 'o3.1', player: 'o', size: 3 },
    //     { id: 'o3.2', player: 'o', size: 3 },
    //   ],
    //   board: [[], [], [], [], [], [], [], [], []],
    //   turn: 'x',
    //   selected: null,
    //   winner: undefined
    // });
    const stateRef = firebase.database().ref('state');
    // stateRef.set({
    //   xPieces: [
    //     { id: 'x1.1', player: 'x', size: 1 },
    //     { id: 'x1.2', player: 'x', size: 1 },
    //     { id: 'x2.1', player: 'x', size: 2 },
    //     { id: 'x2.2', player: 'x', size: 2 },
    //     { id: 'x3.1', player: 'x', size: 3 },
    //     { id: 'x3.2', player: 'x', size: 3 },
    //   ],
    //   oPieces: [
    //     { id: 'o1.1', player: 'o', size: 1 },
    //     { id: 'o1.2', player: 'o', size: 1 },
    //     { id: 'o2.1', player: 'o', size: 2 },
    //     { id: 'o2.2', player: 'o', size: 2 },
    //     { id: 'o3.1', player: 'o', size: 3 },
    //     { id: 'o3.2', player: 'o', size: 3 },
    //   ],
    //   board: [[], [], [], [], [], [], [], [], []],
    //   turn: 'x',
    //   selected: null,
    //   winner: null
    // });
    stateRef.child('xPieces').set([
      { id: 'x1.1', player: 'x', size: 1 },
      { id: 'x1.2', player: 'x', size: 1 },
      { id: 'x2.1', player: 'x', size: 2 },
      { id: 'x2.2', player: 'x', size: 2 },
      { id: 'x3.1', player: 'x', size: 3 },
      { id: 'x3.2', player: 'x', size: 3 },
    ]);
    stateRef.child('oPieces').set([
      { id: 'o1.1', player: 'o', size: 1 },
      { id: 'o1.2', player: 'o', size: 1 },
      { id: 'o2.1', player: 'o', size: 2 },
      { id: 'o2.2', player: 'o', size: 2 },
      { id: 'o3.1', player: 'o', size: 3 },
      { id: 'o3.2', player: 'o', size: 3 },
    ]);
    stateRef.child('board').set({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: []
    });
    stateRef.child('turn').set('x');
    stateRef.child('selected').set(null);
    stateRef.child('winner').set(null);

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
    // const currentBoard = board.map(space => {
    //   return space[space.length - 1];
    // });
    const currentBoard = [
      (board[0]) ? board[0][board[0].length - 1] : null,
      (board[1]) ? board[1][board[1].length - 1] : null,
      (board[2]) ? board[2][board[2].length - 1] : null,
      (board[3]) ? board[3][board[3].length - 1] : null,
      (board[4]) ? board[4][board[4].length - 1] : null,
      (board[5]) ? board[5][board[5].length - 1] : null,
      (board[6]) ? board[6][board[6].length - 1] : null,
      (board[7]) ? board[7][board[7].length - 1] : null,
      (board[8]) ? board[8][board[8].length - 1] : null
    ];
    debugger;


    for (let combo of winningCombos) {

      if (currentBoard[combo[0]] && currentBoard[combo[0]].player === 'x' &&
        currentBoard[combo[1]] && currentBoard[combo[1]].player === 'x' &&
        currentBoard[combo[2]] && currentBoard[combo[2]].player === 'x') {
        return {
          player: 'x',
          combo
        };
      }

      if (currentBoard[combo[0]] && currentBoard[combo[0]].player === 'o' &&
        currentBoard[combo[1]] && currentBoard[combo[1]].player === 'o' &&
        currentBoard[combo[2]] && currentBoard[combo[2]].player === 'o') {
        return {
          player: 'o',
          combo
        };
      }
    }

    return null;
  }

  render() {

    const { turn, xPieces, oPieces, winner } = this.state;

    let winningCombo = [];
    if (winner) {
      winningCombo = winner.combo;
    }


    const xPiecesComponents = xPieces.map(piece => {
      const selected = this.state.selected && this.state.selected.id === piece.id;
      return (
        <Piece key={piece.id} value={piece} selected={selected} onClick={this.handlePieceClick}>
          {piece.id}
        </Piece>
      );
    });

    const oPiecesComponents = oPieces.map(piece => {
      const selected = this.state.selected && this.state.selected.id === piece.id;
      return (
        <Piece key={piece.id} value={piece} selected={selected} onClick={this.handlePieceClick}>
          {piece.id}
        </Piece>
      );
    });


    const xTurn = turn === 'x' ? 'turn' : '';
    const oTurn = turn === 'o' ? 'turn' : '';

    return (
      <div>

        <div className={`player ${xTurn}`}>


          <div className="selection">
            {
              (this.state.selected && this.state.selected.player === 'x') &&
              <Piece value={this.state.selected} onClick={this.handlePieceClick} />
            }
          </div>

          <div className="pieces">
            {xPiecesComponents}
          </div>

        </div>


        <div className="board">
          <div className="roe">
            <div className="column">
              <Space id="0"
                winner={winningCombo.includes(0)}
                value={this.state.board[0]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
            <div className="column">
              <Space id="1"
                winner={winningCombo.includes(1)}
                value={this.state.board[1]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
            <div className="column">
              <Space id="2"
                winner={winningCombo.includes(2)}
                value={this.state.board[2]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
          </div>
          <div className="roe">
            <div className="column">
              <Space id="3"
                winner={winningCombo.includes(3)}
                value={this.state.board[3]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
            <div className="column">
              <Space id="4"
                winner={winningCombo.includes(4)}
                value={this.state.board[4]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
            <div className="column">
              <Space id="5"
                winner={winningCombo.includes(5)}
                value={this.state.board[5]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
          </div>
          <div className="roe">
            <div className="column">
              <Space id="6"
                winner={winningCombo.includes(6)}
                value={this.state.board[6]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
            <div className="column">
              <Space id="7"
                winner={winningCombo.includes(7)}
                value={this.state.board[7]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
            <div className="column">
              <Space id="8"
                winner={winningCombo.includes(8)}
                value={this.state.board[8]}
                onSpaceClick={this.handleSpaceClick}
                onPieceClick={this.handlePieceClick} />
            </div>
          </div>
        </div>


        <div className={`player ${oTurn}`}>

          <div className="pieces">
            {oPiecesComponents}
          </div>

          <div className="selection">
            {
              (this.state.selected && this.state.selected.player === 'o') &&
              <Piece value={this.state.selected} onClick={this.handlePieceClick} />
            }
          </div>


        </div>


        <br />
        <button className="btn btn-secondary btn-lg btn-block" onClick={this.handleReset}>Reset</button>




        {false && !this.state.winner &&
          <div className="info">
            <br />
            <div>Up next: {this.state.turn}</div>
            <div>Selected: {this.state.selected && <Piece value={this.state.selected} />}</div>
          </div>
        }

      </div>
    );
  }
}
