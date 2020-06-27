import React, { Component } from 'react';
import axios from 'axios';

const url = 'http://localhost:8000/api/letters';

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: {
        title: 'React Letter',
        body: 'sdksdlk',
      },
    };
  }

  postLetter() {
    axios({
      method: 'post',
      url: url,
      data: this.state.letter,
    });
  }

  render() {
    return (
      <div className='c-letter'>
        <h2>{this.state.letter.title}</h2>
        <input type='text' onChange={this.updateBody.bind(this)} />
        <button
          onClick={() => {
            this.postLetter();
          }}>
          send
        </button>
      </div>
    );
  }

  updateBody(e) {
    let input = e.target.value;
    this.setState((prevState) => ({
      letter: {
        ...prevState.letter,
        body: input,
      },
    }));
  }
}

export default Letter;
