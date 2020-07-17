import React, { useState, useEffect, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import Letter from '../modules/Letter';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { QuestionContext, AuthContext } from '../hooks/Context';
import closeIcon from '../../assets/icons/close-button.svg';

const Answer: React.FC = () => {
  const location = useLocation();

  const [question, setQuestion] = useState({ title: '', body: '' });
  const Auth: any = useContext(AuthContext);
  const QuestionView: any = useContext(QuestionContext);

  useEffect(() => {
    const url = `http://localhost:8000/api${location.pathname}`;
    axios
      .post(url, { userID: Auth.user.uid })
      .then((response) => {
        if (response.data.message === 'already answered') {
          console.log('You already answered this!');
          QuestionView.setQuestionView({
            ...QuestionView.questionView,
            answered: true,
            loaded: true,
            answer: response.data.answer,
          });
        } else {
          setQuestion(response.data);
          QuestionView.setQuestionView({
            ...QuestionView.questionView,
            loaded: true,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const questionScope = () => (
    <CSSTransition
      in={!QuestionView.questionView.letterVisible}
      classNames='alert'
      timeout={300}>
      <div className='c-question-scope'>
        <div>
          <h1>{question.title}</h1>
          <p>{question.body}</p>
        </div>
        <div
          onClick={() =>
            QuestionView.setQuestionView({
              ...QuestionView.questionView,
              letterVisible: true,
            })
          }
          className='c-btn__submit'>
          <p>answer</p>
        </div>
      </div>
    </CSSTransition>
  );

  const answerScope = () => (
    <CSSTransition
      in={!QuestionView.questionView.letterVisible}
      classNames='alert'
      timeout={600}
      appear>
      <div id='answer' className={'c-answer-scope'}>
        <div
          onClick={() =>
            QuestionView.setQuestionView({
              ...QuestionView.questionView,
              letterVisible: false,
            })
          }
          className='c-answer-scope__close'>
          <img src={closeIcon} alt='close-icon' />
        </div>
        <h1>{question.title}</h1>
        <Letter />
      </div>
    </CSSTransition>
  );

  const answeredScope = () => (
    <div>
      <h1>Your answer was:</h1>
      <h3>{QuestionView.questionView.answer.title}</h3>
      <p>{QuestionView.questionView.answer.body}</p>
    </div>
  );

  return (
    <div>
      {QuestionView.questionView.loaded ? (
        <div>
          {QuestionView.questionView.answered ? (
            answeredScope()
          ) : (
            <div>
              {QuestionView.questionView.letterVisible
                ? answerScope()
                : questionScope()}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Answer;
