import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../hooks/Context';
import * as firebase from 'firebase';

import Question from '../modules/Question';

import googleLogo from '../../assets/icons/login/google.png';

const Login: React.FC = () => {
  const Auth: any = useContext(AuthContext);

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

  return (
    <div>
      {Auth.user.isLoggedIn ? (
        <div className='c-login'>
          <p>you are loggged in</p>
          <button>logout</button>
          <Question />
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
