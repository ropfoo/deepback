import React, { Component } from 'react';

const url = 'http://localhost:8000/api/letters';

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        body: "sdsd"
    };
  }
  postLetter() {

    console.log()
  }

  render() {
    return (
      <div className='c-letter'>
        <p>{this.state.body}</p>
        <h2>My Letter</h2>
        <input type='text' onChange={this.updateBody.bind(this)} />
        <button>send</button>

      </div>
    );
  }

  updateBody(e){
    this.setState({
     body: e.target.value
    })
  }
}

export default Letter;
