import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
// import Login from './Login';
import Home from './Home';
import Facebook from './FacebookPlayer';
import NotFound from './NotFound';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    {/* <Route path='/' component={Login}/> */}
    <Route path='/' component={Home}>
        <Route path='/facebook' component={Facebook} />
        <Route path='/googleplus' component={Home} />
    </Route>
    <Route path='*' component={NotFound}/>
  </Router>,
  document.getElementById('root')
);
