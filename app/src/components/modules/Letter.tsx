import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { letterValidation } from '../../assets/typescript/validation';
import { QuestionContext, AuthContext } from '../hooks/Context';

import { CSSTransition } from 'react-transition-group';

import { useLocation } from 'react-router-dom';

const url = 'http://localhost:8000/api/letters';

interface Letter {
  questionID: string;
  userID: string;
  mood: string;
  title: string;
  body: string;
}

const Letter: React.FC = () => {
  const location = useLocation();

  const Auth: any = useContext(AuthContext);
  const QuestionView: any = useContext(QuestionContext);

  const [letter, setLetter] = useState<Letter>({
    questionID: '',
    userID: Auth.user.uid,
    mood: 'default',
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
    setLetter({
      ...letter,
      mood: newMood,
    });
  };

  const showLetter = () => {
    return (
      <div>
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
                      alt={`mood-${m}`}
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
                alt='current-mood'
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
        <div
          className='c-btn__submit'
          onClick={() => {
            if (letterValidation(letter.title, letter.body, letter.userID)) {
              postLetter();
              QuestionView.setQuestionView({
                ...QuestionView.questionView,
                letterVisible: false,
              });

              QuestionView.setQuestionView({
                ...QuestionView.questionView,
                view: 'answered',
                loaded: true,
                answer: { title: letter.title, body: letter.body },
              });
            }
          }}>
          <p>send</p>
        </div>
      </div>
    );
  };

  return showLetter();
};

export default Letter;
