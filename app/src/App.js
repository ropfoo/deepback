import React, { Component } from 'react';
import Answer from './components/pages/Answer';
import Questions from './components/pages/Questions';
import { Link, Route, Switch } from 'react-router-dom';
import './assets/sass/main.scss';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Link to='/questions'>owner </Link>
        <Link to='/answer'>answer </Link>
        <Switch>
          <Route path='/questions' component={Questions} />
          <Route
            path='/answer'
            component={Answer}
            question='How are you mate?'
          />
        </Switch>
      </div>
    );
  }
}

export default App;
