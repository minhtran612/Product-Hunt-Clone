import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import routes from './routes';
import rootReducer from './rootReducer';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './action/authActions';

import App from './components/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( rootReducer, 
    composeEnhancers(applyMiddleware(thunk)));

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDom.render(
    <Provider store={store} >
        <Router> 
            {routes}
        </Router>
    </Provider>,
document.getElementById('app'));