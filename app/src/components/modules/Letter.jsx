import React, { Component } from 'react';
import axios from 'axios';

import smiley from '../../assets/icons/smiley_default.svg';

const url = 'http://localhost:8000/api/letters';

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: {
        questionID: '5efc4e38472d3f529aaf3f34',
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
        <div className='c-letter__top'>
          <input className='c-letter__name' placeholder='Your Name' />
          <img src={smiley} />
        </div>
        <textarea
          className='c-letter__title'
          placeholder='Title'
          maxLength='50'
          onChange={this.updateTitle.bind(this)}
        />
        <textarea
          className='c-letter__body'
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
