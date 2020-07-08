import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  questions: [];
}

interface Response {
  data: [];
}

const url = 'http://localhost:8000/api/letters';

const Questions: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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
                  <i>{user.name}</i>
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
