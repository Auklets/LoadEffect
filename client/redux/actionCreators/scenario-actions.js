export const GET_SCENARIOS = 'GET_SCENARIOS';
export const TOGGLE_SCENARIO_MODAL = 'TOGGLE_SCENARIO_MODAL';

const showScenarioModal = () => ({
  type: TOGGLE_SCENARIO_MODAL,
  isScenarioOpen: true,
});

const hideScenarioModal = () => ({
  type: TOGGLE_SCENARIO_MODAL,
  isScenarioOpen: false,
});

const allScenarios = (res) => ({
  type: GET_SCENARIOS,
  allScenarios: JSON.parse(res),
});

export const openScenarioModal = () => dispatch => {
  dispatch(showScenarioModal());
};

export const closeScenarioModal = () => dispatch => {
  dispatch(hideScenarioModal());
};

export const getScenarios = () => {
  const token = localStorage.getItem('id_token');

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    },
  };

  return dispatch =>
    fetch('/api/scenarios', config)
      .then(response => response.json()
        .then(res => {
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
      'Authorization': `Bearer ${localStorage.getItem('id_token')}` },
      body: `scenarioName=${data.scenarioName}&spawnsCount=${data.spawnsCount}&targetURL=${data.targetURL}&script=${data.script}&workers=${data.workers}`,
  };

  return dispatch => {
    return fetch('/api/scenarios', config)
      .then(response => response.json()
        .then(res => {
          dispatch(hideScenarioModal());
        })
      )
      .catch(err => console.log('Error: ', err));
    };
  };
