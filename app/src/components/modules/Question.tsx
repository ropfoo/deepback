import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../hooks/Context';

const Question: React.FC = () => {
  const url = 'http://localhost:8000/api/ask';
  const Auth: any = useContext(AuthContext);

  const [question, setQuestion] = useState({
    userID: Auth.user.uid,
    displayName: Auth.user.name,
    title: 'test question title',
    body: 'test question body',
  });

  const sendQuestion = () => {
    console.log(question);
    axios({
      method: 'post',
      url: url,
      data: question,
    });
  };

  return (
    <div>
      <textarea
        placeholder='Title'
        onChange={(e) => {
          setQuestion({
            ...question,
            title: e.target.value,
          });
        }}
      />
      <textarea
        placeholder='My Question'
        onChange={(e) => {
          setQuestion({
            ...question,
            body: e.target.value,
          });
        }}
      />
      <button onClick={sendQuestion}>send</button>
    </div>
  );
};

export default Question;
