import React, { Component } from 'react';
import axios from 'axios';

import smiley from '../../assets/icons/smiley_default.svg';

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
        <img src={smiley} />
        <input className='c-letter__name' placeholder='Your Name' />
        <input
          className='c-letter__title'
          placeholder='Title'
          onChange={this.updateTitle.bind(this)}
        />
        <textarea
          placeholder='Tell us what you think...'
          type='text'
          onChange={this.updateBody.bind(this)}
        />
        <button
          onClick={() => {
            this.postLetter();
          }}>
          send
        </button>
      </div>
    );
  }

  updateTitle(e) {
    let input = e.target.value;
    this.setState((prevState) => ({
      letter: {
        ...prevState.letter,
        title: input,
      },
    }));
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
