import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import store, { history } from './redux/store';

import AppContainer from './components/AppContainer.jsx';
import HomeContainer from './components/Home/HomeContainer.jsx';
import MainContainer from './components/Main/MainContainer.jsx';
import NewScenarioContainer from './components/NewScenario/NewScenarioContainer.jsx';

import LiveResultsContainer from './components/LiveResults/LiveResultsContainer.jsx';
import ResultDetailsContainer from './components/ResultDetails/ResultDetailsContainer.jsx';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="/main" component={MainContainer} />
        <Route path="/new-scenario" component={NewScenarioContainer} />
        <Route path="/live-results" component={LiveResultsContainer} />
        <Route path="/results-detail" component={ResultDetailsContainer} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
