import React, { Component, useState } from 'react';
import Answer from './components/pages/Answer';
import Questions from './components/pages/Questions';
import Login from './components/pages/Login';
import { Link, Route, Switch } from 'react-router-dom';
import './assets/sass/main.scss';

import * as firebase from 'firebase';
import firebaseConfig from './firebase.config';

import logo from './assets/icons/logo.svg';

firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext({});

const App: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  console.log(firebase);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      Is logged in? {JSON.stringify(isLoggedIn)}
      <div className='App'>
        <div className='c-nav'>
          <Link to='/questions'>
            <img className='c-logo' src={logo} alt='' />{' '}
          </Link>
        </div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/questions' component={Questions} />
          <Route exact path='/question/:questionID' component={Answer} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
