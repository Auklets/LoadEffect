import { GET_SCENARIOS, VALID_SCRIPT, RESET_ATTEMPT_CHECK, CURRENT_SCENARIO_INFO } from '../actionCreators/scenario-actions';

const initialState = {
  allScenarios: [],
  currentScenarioID: 0,
  currentSpawnsCount: 0,
  currentWorkers: '',
  currentTargetURL: '',
  currentScenarioName: '',
  isValidScript: false,
  attemptedCheck: false,
};

export const scenarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCENARIOS:
      return Object.assign({}, state, {
        allScenarios: action.scenario,
        siteToken: action.siteToken,
      });

    case VALID_SCRIPT:
      return Object.assign({}, state, {
        isValidScript: action.isValidScript,
        attemptedCheck: true,
      });

    case RESET_ATTEMPT_CHECK:
      return Object.assign({}, state, {
        isValidScript: false,
        attemptedCheck: false,
      });

    case CURRENT_SCENARIO_INFO:
      return Object.assign({}, state, {
        currentScenarioID: action.currentScenarioID,
        currentSpawnsCount: action.currentSpawnsCount,
        currentWorkers: action.currentWorkers,
        currentTargetURL: action.currentTargetURL,
        currentScenarioName: action.currentScenarioName,
      });

    default:
      return state;
  }
};
