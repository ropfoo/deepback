import React, { Component } from 'react';
import Question from '../modules/Question';
import axios from 'axios';

const url = 'http://localhost:8000/api/letters';

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(url)
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toQuestion(id) {
    console.log('to route :' + id);
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => {
          return (
            <div key={user._id}>
              {user.questions.map((question) => {
                return (
                  <div
                    key={question._id}
                    onClick={() => {
                      this.toQuestion(question._id);
                    }}>
                    <h4>{question.title}</h4>
                    <p>{question.body}</p>
                    <b>{user.name}</b>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
export default Owner;
