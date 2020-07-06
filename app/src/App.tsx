import React, { Component } from 'react';
import Answer from './components/pages/Answer';
import Questions from './components/pages/Questions';
import Login from './components/pages/Login';
import { Link, Route, Switch } from 'react-router-dom';
import './assets/sass/main.scss';

import logo from './assets/icons/logo.svg';

const App: React.FC = () => {
  return (
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
  );
};

export default App;
