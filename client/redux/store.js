/* ************ React/Redux/Router ************ */
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';

/* ***************** Reducers ***************** */
import { authReducer } from './reducers/auth-reducer';
import { scenarioReducer } from './reducers/scenario-reducer';
import { modalReducer } from './reducers/modal-reducer';

/* ****************** API's ******************* */
import api from '../middleware/api';

// Combines all reducers into one root reducer to link to store
const reducers = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  allScenario: scenarioReducer,
  modal: modalReducer,
});

const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware, api)(createStore);
const store = createStoreWithMiddleWare(reducers);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
