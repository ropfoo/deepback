import React, { Component } from 'react';

import axios from 'axios';

const url = 'http://localhost:8000/api/letters';

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
    };
  }

  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.title);
        const some = response.data;
        console.log(some);
        this.setState({
          something: response.data[0],
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
        <div>{this.state.something.title}</div>
        <div>{this.state.something.body}</div>
        <div>{this.state.something._id}</div>
      </div>
    );
  }
}

export default Owner;
