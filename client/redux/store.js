/* ************ React/Redux/Router ************ */
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';

/* ***************** Reducers ***************** */
import { authReducer } from './reducers/auth-reducer';
import { scenarioReducer } from './reducers/scenario-reducer';
import { modalReducer } from './reducers/modal-reducer';
import { chartReducer } from './reducers/chart-reducer';

/* ****************** API's ******************* */
import api from '../middleware/api';

// Combines all reducers into one root reducer to link to store
const reducers = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  scenario: scenarioReducer,
  modal: modalReducer,
  charts: chartReducer,
});

const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware, api)(createStore);
const store = createStoreWithMiddleWare(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
