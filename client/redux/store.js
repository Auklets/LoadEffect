import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import api from '../middleware/api';
import reducers from './reducers';

const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware, api)(createStore);
const store = createStoreWithMiddleWare(reducers);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
