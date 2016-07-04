import { receiveLogin } from './login-actions';
import { showScenarioModal } from './modal-actions';
import { sendRequestThenDispatch } from '../../lib/utils.js';

export const GET_SCENARIOS = 'GET_SCENARIOS';
export const VALID_SCRIPT = 'VALID_SCRIPT';
export const RESET_ATTEMPT_CHECK = 'RESET_ATTEMPT_CHECK';
export const CURRENT_SCENARIO_INFO = 'CURRENT_SCENARIO_INFO';
const parser = require('../../lib/parser.js');

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

export const storeRecentScenarioInfo = res => ({
  type: CURRENT_SCENARIO_INFO,
  currentScenarioID: res.scenarioID || res.id,
  currentSpawnsCount: res.spawnsCount,
  currentWorkers: res.workers,
  currentTargetURL: res.targetURL,
  currentScenarioName: res.scenarioName,
});


export const getScenarios = () => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('id_token')}`,
    },
  };

  return sendRequestThenDispatch('/api/scenarios', config, allScenarios, receiveLogin);
};

export const createScenario = data => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      body: `scenarioName=${data.scenarioName}&spawnsCount=${data.spawnsCount}&targetURL=${data.targetURL}&script=${data.script}&workers=${data.workers}`,
  };

  return sendRequestThenDispatch('/api/scenarios', config, resetCheck, showScenarioModal, storeRecentScenarioInfo);
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

  return sendRequestThenDispatch('/api/validate-website', config, getScenarios);
};
