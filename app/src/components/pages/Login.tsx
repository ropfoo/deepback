import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';
import * as firebase from 'firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Auth: any = useContext(AuthContext);

  const handleForm: any = (e: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) Auth.setLoggedIn(true);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

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
            console.log(result);
            //history.push('/reports');
            Auth.setLoggedIn(true);
          })
          .catch((e) => console.log(e.message));
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type='text'
        name='email'
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        name='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={() => handleForm()}>log in</button>
      <button onClick={() => loginWithGoogle()}>login with google</button>
    </div>
  );
};

export default Login;
