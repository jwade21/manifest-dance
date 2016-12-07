import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
// import App from './App';
import Login from './Login';
import Home from './Home';
import Facebook from './Facebook';
import NotFound from './NotFound';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Login}/>
    <Route path='/home' component={Home}>
      {/* <IndexRoute component={Home}/> */}
        <Route path='/facebook' component={Facebook} />
    </Route>
    <Route path='*' component={NotFound}/>
  </Router>,
  document.getElementById('root')
);
