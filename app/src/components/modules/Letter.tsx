import React, { useState, useEffect } from 'react';
import axios from 'axios';

import smiley from '../../assets/icons/smiley_default.svg';
import { useLocation } from 'react-router-dom';

const url = 'http://localhost:8000/api/letters';

const Letter: React.FC = () => {
  const location = useLocation();
  const [answered, setAnswered] = useState(false);
  const [letter, setLetter] = useState({
    questionID: '',
    title: 'React Letter',
    body: 'sdksdlk',
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
      <button
        onClick={() => {
          postLetter();
          setAnswered(true);
        }}>
        send
      </button>
    </div>
  );
};

export default Letter;
