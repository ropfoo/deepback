import React, { Component } from 'react';

import axios from 'axios';

const url = 'http://localhost:8000/api/letters';

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letters: [],
    };
  }

  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        this.setState({
          letters: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Hello I am Owner</h1>
        <div>
          {this.state.letters.map((letter) => (
            <div key={letter._id}>
              <h3>{letter.title}</h3>
              <p>{letter.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Owner;
