import React, { Component } from 'react';
import {Link} from 'react-router';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <Link to='/home'>YoutubeList</Link>
      </div>
    );
  }
}

export default Login;
