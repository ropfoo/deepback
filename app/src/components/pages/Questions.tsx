import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = 'http://localhost:8000/api/letters';

const Questions: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {users.map((user: any) => {
        return (
          <div key={user._id}>
            {user.questions.map((question: any) => {
              return (
                <Link key={question._id} to={`question/${question._id}`}>
                  <div className='c-question-prev'>
                    <h2>{question.title}</h2>
                    <p>{question.body}</p>
                    <i>{user.name}</i>
                  </div>
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
