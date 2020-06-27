import React, { Component } from 'react';
import Letter from '../modules/Letter';

class User extends Component {
  render() {
    return (
      <div>
        <h1>Hello I am User</h1>
        <Letter />
      </div>
    );
  }
}

export default User;
