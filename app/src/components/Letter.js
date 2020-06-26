import React, { Component } from 'react';

class Letter extends Component {
  render() {
    return (
      <div className='c-letter'>
        <h2>My Letter</h2>
        <input type='text' />
        <button>send</button>
      </div>
    );
  }
}

export default Letter;
