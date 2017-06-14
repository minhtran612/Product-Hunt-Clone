import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './components/App';
import HomePage from './components/HomePage';
import SignUpPage from './components/signup/SignUpPage';
import LoginPage from './components/login/LoginPage';

export default (
    <App>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/login" component={LoginPage}/>
        </Switch>
    </App>
)