import React, { Component } from 'react';
import { render } from 'react-dom';
import TicTacToe from './TicTacToe';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <TicTacToe />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
