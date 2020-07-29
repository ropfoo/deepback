import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { QuestionContext } from '../hooks/Context';

interface Question {
  _id: string;
  title: string;
  body: string;
  displayName: string;
}

interface Response {
  data: [];
}

const url = `${process.env.REACT_APP_API_URL}/letters`;

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState([]);
  const QuestionView: any = useContext(QuestionContext);

  useEffect(() => {
    QuestionView.setQuestionView({
      letterVisible: false,
      answered: false,
      loaded: false,
    });

    axios
      .get(url)
      .then((response: Response) => {
        setQuestions(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {questions.map((question: Question) => {
        return (
          <Link
            className='c-question-prev'
            key={question._id}
            to={`question/${question._id}`}>
            <h2>{question.title}</h2>
            <p>{question.body}</p>
            <i>{question.displayName}</i>
          </Link>
        );
      })}
    </div>
  );
};
export default Questions;
