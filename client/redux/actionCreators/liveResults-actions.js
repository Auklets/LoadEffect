import io from 'socket.io-client';

export const UPDATE_LINE_CHART = 'UPDATE_LINE_CHART';
export const UPDATE_CURRENT_ACTION = 'UPDATE_CURRENT_ACTION';

const token = localStorage.getItem('id_token');
const socket = io({
  query: `token=${token}`,
});

socket.on('connect', () => {
  socket.emit('room', 'clientID');
});

// REMOVE COUNTER FOR PRODUCTION
let tempCounter = 0;

/* ******* Update Line Chart Data Actions ******* */
export const updateLineChartAction = spawnData => ({
  type: UPDATE_LINE_CHART,
  labels: spawnData.labels,
  series: spawnData.series,
});

export const updateCurrentAction = actionData => ({
  type: UPDATE_CURRENT_ACTION,
  index: actionData.index,
  httpVerb: actionData.httpVerb,
  statusCode: actionData.statusCode,
  elapsedTime: actionData.elapsedTime,
});

export const updateLineChartData = (jobCount, scenarioID) => {
  // console.log('We have called updateLineChartData');

  return dispatch => {
    // Set up sockets
    socket.emit('getResultsData', { currentScenarioID: scenarioID });
    socket.on('receiveResultsData', (data) => {
      console.log('Got data from sockets', data);
      socket.removeAllListeners('receiveResultsData');
      const spawnData = data.spawn;
      const actionData = data.action;
      dispatch(updateLineChartAction(spawnData));
      dispatch(updateCurrentAction(actionData));
      // REMOVE COUNTER FOR PRODUCTION
      tempCounter++;
      if (data.spawn.labels.length < jobCount && tempCounter < 10) {
        // REMOVE COUNTER FOR PRODUCTION
        // console.log('tempCounter count is', tempCounter);
        // REMOVE TEST SCENARIO FOR PRODUCTION
        dispatch(updateLineChartData(jobCount, scenarioID));
      }
    });
  };
};
