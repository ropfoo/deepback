import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { QuestionContext } from '../hooks/Context';

interface User {
  _id: string;
  name: string;
  displayName: string;
  questions: [];
}

interface Response {
  data: [];
}

const url = 'http://localhost:8000/api/letters';

const Questions: React.FC = () => {
  const [users, setUsers] = useState([]);
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
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {users.map((user: User) => {
        return (
          <div key={user._id}>
            {user.questions.map((question: any) => {
              return (
                <Link
                  className='c-question-prev'
                  key={question._id}
                  to={`question/${question._id}`}>
                  <h2>{question.title}</h2>
                  <p>{question.body}</p>
                  <i>{user.displayName}</i>
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Questions;
