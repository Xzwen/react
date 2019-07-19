
import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, Redirect, browserHistory } from 'react-router'

import App from '../App'
import Login from '../pages/login'
import Home from '../pages/home'

import Main from '../pages/home/main'
import Meeting from '../pages/home/meeting'
import Device from '../pages/home/device'
import Users from '../pages/home/users'
import MeetingManagement from '../pages/home/meeting/meetingManagement'
import UsersManagement from '../pages/home/users/usersManagement'
import deviceManagement from '../pages/home/device/deviceManagement'

import NoFound from '../pages/noFound/index'

const routes = (
  <Router history={browserHistory}>

    <Route path="/">
        <IndexRedirect to="login"/>
        <Route path="login" component={Login}/>
        <Route path="home" component={Home}>
          <IndexRedirect to="main"/>
          <Route path="main" component={Main}/>
          <Route path="meeting" component={Meeting}/>
          <Route path="meeting/meetingManagement" component={MeetingManagement}/>
          <Route path="device" component={Device}/>
          <Route path="device/deviceManagement" component={deviceManagement}/>
          <Route path="users" component={Users}/>
          <Route path="users/usersManagement" component={UsersManagement}/>
        </Route>
    </Route>
    
    <Route path='*' component={NoFound}/>
  </Router>	
);

export default routes