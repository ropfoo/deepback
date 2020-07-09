import React, { useState, useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';
import * as firebase from 'firebase';

const Login = () => {
  const Auth: any = useContext(AuthContext);

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
          })
          .catch((e) => console.log(e.message));
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => loginWithGoogle()}>login with google</button>
    </div>
  );
};

export default Login;
