export const GET_SCENARIOS = 'GET_SCENARIOS';
export const VALID_SCRIPT = 'VALID_SCRIPT';
export const RESET_ATTEMPT_CHECK = 'RESET_ATTEMPT_CHECK';
export const TOGGLE_SCENARIO_MODAL = 'TOGGLE_SCENARIO_MODAL';
export const CURRENT_SCENARIO_ID = 'CURRENT_SCENARIO_ID';
export const CURRENT_SPAWNS_COUNT = 'CURRENT_USER_COUNT';


/* ******** Scenario Modal Actions  ******** */
const showScenarioModal = () => ({
  type: TOGGLE_SCENARIO_MODAL,
  isScenarioModalOpen: true,
});

const hideScenarioModal = () => ({
  type: TOGGLE_SCENARIO_MODAL,
  isScenarioModalOpen: false,
});

export const openScenarioModal = () => dispatch => {
  dispatch(showScenarioModal());
};

export const closeScenarioModal = () => dispatch => {
  dispatch(hideScenarioModal());
};


/* ******* Script Validation Actions ******* */
const validScript = () => ({
  type: VALID_SCRIPT,
  isValidScript: true,
  attemptedCheck: true,
});

const invalidScript = () => ({
  type: VALID_SCRIPT,
  isValidScript: false,
  attemptedCheck: true,
});

const resetCheck = () => ({
  type: RESET_ATTEMPT_CHECK,
  isValidScript: false,
  attemptedCheck: false,
});

export const resetAttempt = () => dispatch => dispatch(resetCheck());

export const checkValidScript = script => {
  // script is going to be a string. Below, isValidScript should be a boolean

  const isValidScript = /* Insert Parsing script logic here */ true;

  return dispatch => {
    if (isValidScript) {
      dispatch(validScript());
    } else {
      dispatch(invalidScript());
    }
  };
};


/* ******** Scenario Get and Create Actions  ******** */
const allScenarios = res => ({
  type: GET_SCENARIOS,
  scenario: JSON.parse(res),
});

const storeRecentScenarioID = (scenarioID) => ({
  type: CURRENT_SCENARIO_ID,
  currentScenarioID: scenarioID,
});

const storeRecentUserCount = (spawnsCount) => ({
  type: CURRENT_SPAWNS_COUNT,
  currentSpawnsCount: spawnsCount,
});

export const getScenarios = () => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('id_token')}`,
    },
  };

  return dispatch =>
    fetch('/api/scenarios', config)
      .then(response => response.json()
        .then(res => {
          // console.log(JSON.parse(res));
          dispatch(allScenarios(res));
        })
      )
      .catch(err => console.log('Error: ', err));
};

export const createScenario = data => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      body: `scenarioName=${data.scenarioName}&spawnsCount=${data.spawnsCount}&targetURL=${data.targetURL}&script=${data.script}&workers=${data.workers}`,
  };

  return dispatch =>
    fetch('/api/scenarios', config)
      .then(response => response.json()
        .then(res => {
          console.log('Response from the post request', res);
          dispatch(storeRecentScenarioID(res.scenarioID));
          dispatch(storeRecentUserCount(res.spawnsCount));
          dispatch(resetCheck());
          dispatch(showScenarioModal());
        })
      )
      .catch(err => console.log('Error: ', err));
};
