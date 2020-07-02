import React, { Component } from 'react';
import Answer from './components/pages/Answer';
import Questions from './components/pages/Questions';
import { Link, Route, Switch } from 'react-router-dom';
import './assets/sass/main.scss';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Link to='/questions'>all questions </Link>
        <Switch>
          <Route exact path='/question/:questionID' component={Answer} />
          <Route path='/questions' component={Questions} />
        </Switch>
      </div>
    );
  }
}

export default App;
