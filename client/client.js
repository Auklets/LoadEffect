import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import store, { history } from './redux/store';

import AppContainer from './components/AppContainer.jsx';
import SignupContainer from './components/Signup/SignupContainer.jsx';
import LoginContainer from './components/Login/LoginContainer.jsx';
import HomeContainer from './components/Home/HomeContainer.jsx';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/signup" component={SignupContainer} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
