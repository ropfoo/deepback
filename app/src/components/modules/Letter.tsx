import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { letterValidation } from '../../assets/typescript/validation';
import { AuthContext } from '../hooks/AuthContext';

import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group';

import { useLocation } from 'react-router-dom';

const url = 'http://localhost:8000/api/letters';

interface Letter {
  questionID: string;
  userID: string;
  title: string;
  body: string;
}

const Letter: React.FC = () => {
  const location = useLocation();

  const Auth: any = useContext(AuthContext);
  const [answered, setAnswered] = useState(false);
  const [letter, setLetter] = useState<Letter>({
    questionID: '',
    userID: '',
    title: '',
    body: '',
  });

  const [moodMenu, setMoodMenu] = useState(false);
  const [mood, setMood] = useState('default');
  const moods = ['happy', 'neutral', 'sad', 'default'];

  useEffect(() => {
    const path: string = location.pathname.split('/')[2];
    setLetter({
      ...letter,
      questionID: path,
      userID: Auth.user.uid,
    });
  }, []);

  const postLetter = () => {
    console.log(letter);

    axios({
      method: 'post',
      url: url,
      data: letter,
    });
  };

  const changeMood = (newMood: string) => {
    setMood(newMood);
    setMoodMenu(false);
  };

  const showLetter = () => {
    return (
      <div className={`c-letter ${mood}`}>
        <div className='c-letter__top'>
          <input className='c-letter__name' placeholder='Your Name' />
          {moodMenu ? (
            <CSSTransition in={moodMenu} classNames='fade' timeout={600}>
              <div className='c-letter__moods'>
                {moods.map((m) => (
                  <img
                    key={m}
                    src={require(`../../assets/icons/smiley_${m}.svg`)}
                    onClick={() => changeMood(m)}
                  />
                ))}
              </div>
            </CSSTransition>
          ) : (
            <CSSTransition in={moodMenu} classNames='fade' timeout={600}>
              <span></span>
            </CSSTransition>
          )}
          <CSSTransition in={moodMenu} classNames='fade' timeout={600}>
            <img
              onClick={() => setMoodMenu(!moodMenu)}
              src={require(`../../assets/icons/smiley_${mood}.svg`)}
            />
          </CSSTransition>
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
          if (letterValidation(letter.title, letter.body, letter.userID)) {
            postLetter();
            setAnswered(true);
          }
        }}>
        <p>send</p>
      </div>
    </div>
  );
};

export default Letter;
