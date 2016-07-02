import { receiveLogin } from './login-actions';
import { showScenarioModal } from './modal-actions';

export const GET_SCENARIOS = 'GET_SCENARIOS';
export const VALID_SCRIPT = 'VALID_SCRIPT';
export const RESET_ATTEMPT_CHECK = 'RESET_ATTEMPT_CHECK';
export const CURRENT_SCENARIO_INFO = 'CURRENT_SCENARIO_INFO';
const parser = require('../../middleware/parser.js');

/* ******* Script Validation Actions ******* */
export const validScript = () => ({
  type: VALID_SCRIPT,
  isValidScript: true,
});

export const invalidScript = () => ({
  type: VALID_SCRIPT,
  isValidScript: false,
});

export const resetCheck = () => ({
  type: RESET_ATTEMPT_CHECK,
});


export const resetAttempt = () => dispatch => dispatch(resetCheck());

export const checkValidScript = script => {
  // script is going to be a string. Below, isValidScript should be a boolean

  const parseObject = parser.parseTest(script);

  const isValidScript = parseObject.success;

  if (!isValidScript) {
    alert('At line: ' + parseObject.line + ' and column: ' + parseObject.column + ' ' + parseObject.error);
  }

  return dispatch => {
    if (isValidScript) {
      dispatch(validScript());
    } else {
      dispatch(invalidScript());
    }
  };
};


/* ******** Scenario Get and Create Actions  ******** */
export const allScenarios = res => ({
  type: GET_SCENARIOS,
  scenario: JSON.parse(res.scenarios),
});

const storeRecentScenarioInfo = (scenarioID, spawnsCount, workerCount, targetURL, scenarioName) => ({
  type: CURRENT_SCENARIO_INFO,
  currentScenarioID: scenarioID,
  currentSpawnsCount: spawnsCount,
  currentWorkers: workerCount,
  currentTargetURL: targetURL,
  currentScenarioName: scenarioName,
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
          // Store all scenarios associated with user to state
          dispatch(allScenarios(res));
          // Store users site token, so page refreshes will still send it back
          dispatch(receiveLogin(res));
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
          dispatch(resetCheck());
          dispatch(showScenarioModal());
          dispatch(storeRecentScenarioInfo(res.scenarioID, res.spawnsCount, res.workers, res.targetURL, res.scenarioName));
        })
      )
      .catch(err => console.log('Error: ', err));
};


/* ******** Website Url Validation Actions  ******** */
export const checkForValidUrl = (url, scenarioID) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      body: `url=${url}&scenarioID=${scenarioID}`,
  };

  return dispatch =>
    fetch('/api/validate-website', config)
      .then(response => response.json()
        .then(res => {
          console.log('Response from the post request', res);
          dispatch(getScenarios());
        })
      )
      .catch(err => console.log('Error: ', err));
};
