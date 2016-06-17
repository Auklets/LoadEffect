import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import reducers from './reducers';

const initialState = {
  data: {
    testName: 'Test 1000',
    numOfSlaves: 1000,
  },
};

const store = createStore(reducers, initialState);

export const history = syncHistoryWithStore(browserHistory, store);
export default store;
