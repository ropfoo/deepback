import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <textarea placeholder='Title' />
        <textarea placeholder='My Question' />
      </div>
    );
  }
}
export default Question;
