import React, { useState, createContext, useContext } from 'react';
import Answer from './components/pages/Answer';
import Questions from './components/pages/Questions';
import Login from './components/pages/Login';
import { Link, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './assets/sass/main.scss';

import * as firebase from 'firebase';
import firebaseConfig from './firebase.config';

import { AuthContext } from './components/hooks/AuthContext';

import logo from './assets/icons/logo.svg';

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    uid: '',
    name: '',
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className='App'>
        <div className='c-nav'>
          <Link to='/questions'>
            <img className='c-logo' src={logo} alt='' />
          </Link>
          logged in: {JSON.stringify(user.isLoggedIn)}
          <h3>{user.name}</h3>
        </div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <ProtectedRoute user={user} path='/questions' component={Questions} />
          <Route exact path='/question/:questionID' component={Answer} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
