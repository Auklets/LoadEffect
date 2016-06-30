import { GET_SCENARIOS } from '../actionCreators/scenario-actions';

export const scenarioReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SCENARIOS:
      return Object.assign({}, state, {
        allScenarios: action.allScenarios,
      });

    default:
      return state;
  }
};
