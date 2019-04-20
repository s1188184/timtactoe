import React from "react";
import ReactDOM from "react-dom";


import './tictactoe.css';

export default class Piece extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.value);
  }
  

  render() {
    const { value, selected } = this.props;

    
    const selectedClass = selected ? 'selected': '';

    return (
      <div className={`piece ${value.player} size${value.size} ${selectedClass}`} onClick={this.handleClick}>
          {/*value.player*/}
      </div>
    );
  }
}