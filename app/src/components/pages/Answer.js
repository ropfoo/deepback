import React, { Component } from 'react';
import Letter from '../modules/Letter';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'Super cool question!',
    };
  }
  render() {
    return (
      <div>
        <h1>{this.state.question}</h1>
        <Letter />
      </div>
    );
  }
}

export default Answer;
