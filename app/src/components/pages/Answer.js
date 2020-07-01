import React, { Component } from 'react';
import Letter from '../modules/Letter';
import axios from 'axios';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'Super cool question!',
    };
  }

  componentDidMount() {
    const url = `http://localhost:8000/api${this.props.location.pathname}`;
    axios
      .get(url)
      .then((response) => {
        this.setState({
          question: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>{this.state.question}</h1>
        <Letter />
      </div>
    );
  }
}

export default Answer;
