import React, { Component, useState, useEffect } from 'react';
import Letter from '../modules/Letter';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

const Answer: React.FC = () => {
  const location = useLocation();
  const [question, setQuestion] = useState({ title: '', body: '' });

  useEffect(() => {
    const url = `http://localhost:8000/api${location.pathname}`;
    axios
      .get(url)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>{question.title}</h1>
      <p>{question.body}</p>
      <Letter />
    </div>
  );
};

export default Answer;
