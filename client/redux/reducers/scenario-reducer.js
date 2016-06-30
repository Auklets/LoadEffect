import { GET_SCENARIOS, VALID_SCRIPT, RESET_ATTEMPT_CHECK } from '../actionCreators/scenario-actions';

const initialState = {
  isValidScript: false,
  attemptedCheck: false,
};

export const scenarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCENARIOS:
      return Object.assign({}, state, {
        allScenarios: action.scenario,
      });

    case VALID_SCRIPT:
      return Object.assign({}, state, {
        isValidScript: action.isValidScript,
        attemptedCheck: action.attemptedCheck,
      });

    case RESET_ATTEMPT_CHECK:
      return Object.assign({}, state, {
        isValidScript: action.isValidScript,
        attemptedCheck: action.attemptedCheck,
      });

    default:
      return state;
  }
};
