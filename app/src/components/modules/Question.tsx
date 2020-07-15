import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../hooks/AuthContext';

const Question: React.FC = () => {
  const url = 'http://localhost:8000/api/ask';
  const Auth: any = useContext(AuthContext);

  const [question, setQuestion] = useState({
    userID: Auth.user.uid,
    name: Auth.user.name,
    title: 'test question title',
    body: 'test question body',
  });

  const sendQuestion = () => {
    axios({
      method: 'post',
      url: url,
      data: question,
    });
  };

  return (
    <div>
      <textarea placeholder='Title' />
      <textarea placeholder='My Question' />
      <button onClick={sendQuestion}>send</button>
    </div>
  );
};

export default Question;
