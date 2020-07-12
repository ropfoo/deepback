import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { letterValidation } from '../../assets/typescript/validation';

import smiley from '../../assets/icons/smiley_default.svg';
import { useLocation } from 'react-router-dom';

const url = 'http://localhost:8000/api/letters';

interface Letter {
  questionID: string;
  title: string;
  body: string;
}

const Letter: React.FC = () => {
  const location = useLocation();
  const [answered, setAnswered] = useState(false);
  const [letter, setLetter] = useState<Letter>({
    questionID: '',
    title: '',
    body: '',
  });

  useEffect(() => {
    const path: string = location.pathname.split('/')[2];
    setLetter({
      ...letter,
      questionID: path,
    });
  }, []);

  const postLetter = () => {
    axios({
      method: 'post',
      url: url,
      data: letter,
    });
  };

  const showLetter = () => {
    return (
      <div className='c-letter'>
        <div className='c-letter__top'>
          <input className='c-letter__name' placeholder='Your Name' />
          <img src={smiley} />
        </div>
        <textarea
          className='c-letter__title'
          placeholder='Title'
          maxLength={50}
          onChange={(e) =>
            setLetter({
              ...letter,
              title: e.target.value,
            })
          }
        />
        <textarea
          className='c-letter__body'
          placeholder='Tell us what you think...'
          onChange={(e) => {
            setLetter({
              ...letter,
              body: e.target.value,
            });
          }}
        />
      </div>
    );
  };

  const showResult = () => {
    return (
      <div>
        <h2>Thanks</h2>
      </div>
    );
  };

  return (
    <div>
      {answered ? showResult() : showLetter()}
      <div
        className='c-btn__submit'
        onClick={() => {
          if (letterValidation(letter.title, letter.body)) {
            // postLetter();
            setAnswered(true);
          }
        }}>
        send
      </div>
    </div>
  );
};

export default Letter;
