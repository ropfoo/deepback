import React, { useState, useEffect } from 'react';
import Answer from './components/pages/Answer';
import Questions from './components/pages/Questions';
import Login from './components/pages/Login';
import { Link, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './assets/sass/main.scss';

import * as firebase from 'firebase';
import firebaseConfig from './firebase.config';

import { AuthContext } from './components/hooks/AuthContext';
import { QuestionContext } from './components/hooks/Context';

import logo from './assets/icons/logo.svg';

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    uid: '',
    name: '',
  });

  const [questionView, setQuestionView] = useState({
    letterVisible: false,
    answered: false,
    loaded: false,
    answer: null,
  });

  function readSession() {
    const userStored = window.sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    );
    if (userStored) {
      const u = JSON.parse(userStored);
      setUser({
        uid: u.uid,
        name: u.displayName,
        isLoggedIn: true,
      });
    }
  }

  useEffect(() => {
    readSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className='App'>
        <div className='c-nav'>
          <Link to='/questions'>
            <img className='c-logo' src={logo} alt='' />
          </Link>
          <div>
            {user.isLoggedIn ? (
              <Link to='/login'>
                <h3>{user.name}</h3>
              </Link>
            ) : (
              <Link to='/login'>
                <p>login</p>
              </Link>
            )}
          </div>
        </div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <QuestionContext.Provider value={{ questionView, setQuestionView }}>
            <Route path='/questions' component={Questions} />
            <ProtectedRoute
              exact
              path='/question/:questionID'
              component={Answer}
            />
          </QuestionContext.Provider>
        </Switch>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
