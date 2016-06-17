import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return Object.assign({}, state, action.newData);

    default:
      return state;
  }
};

const rootReducer = combineReducers(
  {
    data: dataReducer,
    routing: routerReducer,
  }
);

export default rootReducer;
