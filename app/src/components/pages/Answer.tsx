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
            view: 'answered',
            loaded: true,
            answer: response.data.answer,
          });
        } else if (response.data.happy != undefined) {
          console.log('own question');
          QuestionView.setQuestionView({
            ...QuestionView.questionView,
            view: 'stats',
            stats: response.data,
            loaded: true,
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

  const checkView = () => {
    if (QuestionView.questionView.view === 'answered') {
      return answeredScope();
    } else if (QuestionView.questionView.view === 'stats') {
      return (
        <div>
          <h3>{QuestionView.questionView.stats.question.title}</h3>
          <p>{QuestionView.questionView.stats.question.body}</p>
          <p>happy: {QuestionView.questionView.stats.happy}</p>
          <p>neutral: {QuestionView.questionView.stats.neutral}</p>
          <p>sad: {QuestionView.questionView.stats.sad}</p>
          <p>default: {QuestionView.questionView.stats.default}</p>

          {QuestionView.questionView.stats.question.answers ? (
            QuestionView.questionView.stats.question.answers.map(
              (answer: any) => {
                return (
                  <div key={answer._id}>
                    <h4>{answer.title}</h4>
                    <p>{answer.body}</p>
                    <p>{answer.mood}</p>
                  </div>
                );
              }
            )
          ) : (
            <div>no answers</div>
          )}
        </div>
      );
    } else {
      return QuestionView.questionView.letterVisible
        ? answerScope()
        : questionScope();
    }
  };

  return (
    <div>
      {QuestionView.questionView.loaded ? (
        <div>{checkView()}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Answer;
