import React, { Component } from 'react';
import { render } from 'react-dom';

import firebase, { auth, provider } from './firebase';

import TicTacToe from './TicTacToe';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }



  componentDidMount() {

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }


  render() {
    return (
      <div>
        {!this.state.user ?
          <button className="btn btn-secondary btn-lg btn-block" onClick={this.login}>Login</button>
          :
          <TicTacToe />
        }

      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
