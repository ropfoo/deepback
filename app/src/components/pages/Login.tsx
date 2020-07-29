import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../hooks/Context';
import axios from 'axios';
import * as firebase from 'firebase';

import QuestionView from '../modules/QuestionView';

import googleLogo from '../../assets/icons/login/google.png';

const Login: React.FC = () => {
  const Auth: any = useContext(AuthContext);
  const [userQuestions, setUserQuestions] = useState([]);

  const history = useHistory();

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            Auth.setUser({
              isLoggedIn: true,
              uid: result.user?.uid,
              name: result.user?.displayName,
            });
            history.push('/questions');
          })
          .catch((e) => console.log(e.message));
      });
  };

  const getUserQuestions = () => {
    const url = `${process.env.REACT_APP_API_URL}/user-questions`;
    axios
      .post(url, {
        name: Auth.user.uid,
      })
      .then((response) => {
        console.log(response.data);
        setUserQuestions(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {Auth.user.isLoggedIn ? (
        <div className='c-login'>
          <p>you are loggged in</p>
          <button>logout</button>
          <QuestionView />
          <button onClick={() => getUserQuestions()}>show my questions</button>
          <div>
            {userQuestions.map((q: any) => {
              return (
                <Link
                  className='c-question-prev'
                  key={q._id}
                  to={`question/${q._id}`}>
                  <h3>{q.title}</h3>
                  <p>{q.body}</p>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className='c-login'>
          <h1>Login</h1>
          <div className='c-btn__login' onClick={() => loginWithGoogle()}>
            <img src={googleLogo} alt='google' />
            <p>login with google</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
