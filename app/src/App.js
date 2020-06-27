import React, { Component } from 'react';
import User from './components/pages/User';
import Owner from './components/pages/Owner';
import { Link, Route, Switch } from 'react-router-dom';
import './assets/sass/main.scss';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Link to='/owner'>owner </Link>
        <Link to='/user'>user </Link>
        <Switch>
          <Route path='/owner' component={Owner} />
          <Route path='/user' component={User} />
        </Switch>
      </div>
    );
  }
}

export default App;
