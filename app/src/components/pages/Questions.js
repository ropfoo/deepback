import React, { Component } from 'react';
import Question from '../modules/Question';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Answer from '../pages/Answer';

const url = 'http://localhost:8000/api/letters';

class Questions extends Component {
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
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => {
          return (
            <div key={user._id}>
              {user.questions.map((question) => {
                return (
                  <Link key={question._id} to={`question/${question._id}`}>
                    <div>
                      <h4>{question.title}</h4>
                      <p>{question.body}</p>
                      <b>{user.name}</b>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
export default Questions;
