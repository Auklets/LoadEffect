import { GET_SCENARIOS, VALID_SCRIPT, RESET_ATTEMPT_CHECK, CURRENT_SCENARIO_INFO, CHANGE_CURRENT_ID } from '../actionCreators/scenario-actions';

const initialState = {
  allScenarios: [],
  currentScenarioID: 0,
  currentSpawnsCount: 0,
  currentWorkers: 0,
  currentTargetURL: '',
  currentScenarioName: '',
  isValidScript: false,
  attemptedCheck: false,
  completion: false,
  isVerifiedOwner: false,
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
        attemptedCheck: true,
        scriptMessage: action.scriptMessage,
      });

    case RESET_ATTEMPT_CHECK:
      return Object.assign({}, state, {
        isValidScript: false,
        attemptedCheck: false,
      });

    case CHANGE_CURRENT_ID:
      return Object.assign({}, state, {
        currentScenarioID: action.currentScenarioID,
      });

    case CURRENT_SCENARIO_INFO:
      return Object.assign({}, state, {
        currentScenarioID: action.currentScenarioID,
        currentSpawnsCount: action.currentSpawnsCount,
        currentWorkers: action.currentWorkers,
        currentTargetURL: action.currentTargetURL,
        currentScenarioName: action.currentScenarioName,
        currentScript: action.currentScript,
        isVerifiedOwner: action.isVerifiedOwner,
        completion: action.completion,
      });

    default:
      return state;
  }
};
