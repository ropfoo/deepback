import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import Letter from '../modules/Letter';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthContext';
import closeIcon from '../../assets/icons/close-button.svg';

const Answer: React.FC = () => {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [answered, setAnswered] = useState(false);

  const [question, setQuestion] = useState({ title: '', body: '' });
  const [answer, setAnswer] = useState({ title: '', body: '' });
  const [letterView, setLetterView] = useState(false);
  const Auth: any = useContext(AuthContext);

  useEffect(() => {
    const url = `http://localhost:8000/api${location.pathname}`;
    axios
      .post(url, { userID: Auth.user.uid })
      .then((response) => {
        if (response.data.message === 'already answered') {
          console.log('You already answered this!');
          setAnswered(true);
          setAnswer(response.data.answer);
          setLoaded(true);
        } else {
          setQuestion(response.data);
          setLoaded(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const questionScope = () => (
    <CSSTransition in={!letterView} classNames='alert' timeout={300}>
      <div className='c-question-scope'>
        <div>
          <h1>{question.title}</h1>
          <p>{question.body}</p>
        </div>
        <div onClick={() => setLetterView(true)} className='c-btn__submit'>
          <p>answer</p>
        </div>
      </div>
    </CSSTransition>
  );

  const answerScope = () => (
    <CSSTransition in={!letterView} classNames='alert' timeout={600} appear>
      <div id='answer' className={'c-answer-scope'}>
        <div className='c-answer-scope__close'>
          <img
            onClick={() => setLetterView(false)}
            src={closeIcon}
            alt='close-icon'
          />
        </div>
        <h1>{question.title}</h1>
        <Letter />
      </div>
    </CSSTransition>
  );

  const answeredScope = () => (
    <div>
      <h1>Your answer was:</h1>
      <h3>{answer.title}</h3>
      <p>{answer.body}</p>
    </div>
  );

  return (
    <div>
      {loaded ? (
        <div>
          {answered ? (
            answeredScope()
          ) : (
            <div>{letterView ? answerScope() : questionScope()}</div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Answer;
