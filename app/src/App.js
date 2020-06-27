import React, { Component } from 'react';

import Letter from './components/Letter';
import './assets/sass/main.scss';

import axios from 'axios';

const url = 'http://localhost:8000/api/letters';
const getLetters = () => {
  axios
    .get(url)
    .then((response) => {
      console.log(response.data[0]);
      this.setState({some: response.data})
    })
    .catch((err) => {
      console.log(err);
    });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: "",
    };
  }

  componentDidMount() {
    axios
    .get(url)
    .then((response) => {
      console.log(response.data.title);
      const some = response.data
      console.log(some)
      this.setState({
        something: response.data[0]
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <Letter />
        </header>
        <div>{this.state.something.title}</div>
        <div>{this.state.something.body}</div>
        <div>{this.state.something._id}</div>
      </div>
    );
  }
}

export default App;
