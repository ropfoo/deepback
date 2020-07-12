import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Letter from '../modules/Letter';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import closeIcon from '../../assets/icons/close-button.svg';

const Answer: React.FC = () => {
  const location = useLocation();
  const [question, setQuestion] = useState({ title: '', body: '' });
  const [letterView, setLetterView] = useState(false);

  useEffect(() => {
    const url = `http://localhost:8000/api${location.pathname}`;
    axios
      .get(url)
      .then((response) => {
        setQuestion(response.data);
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
          <img onClick={() => setLetterView(false)} src={closeIcon} />
        </div>
        <h1>{question.title}</h1>
        <Letter />
      </div>
    </CSSTransition>
  );

  return (
    <div>
      <div>{letterView ? answerScope() : questionScope()}</div>
    </div>
  );
};

export default Answer;
