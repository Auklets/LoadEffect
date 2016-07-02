import io from 'socket.io-client';

export const UPDATE_LINE_CHART = 'UPDATE_LINE_CHART';
export const UPDATE_CURRENT_ACTION = 'UPDATE_CURRENT_ACTION';

const token = localStorage.getItem('id_token');
const socket = io({
  query: `token=${token}`,
});

// REMOVE COUNTER FOR PRODUCTION
let tempCounter = 0;

// Update line chart data
export const updateLineChartData = (jobCount, scenarioID) => {
  console.log('We have called updateLineChartData');

  return dispatch => {
    // Set up sockets
    socket.emit('getResultsData', { currentScenarioID: scenarioID });
    socket.on('receiveResultsData', (data) => {
      console.log('Got data from sockets', data);
      const spawnData = data.spawn;
      const actionData = data.action;
      dispatch({
        type: UPDATE_LINE_CHART,
        labels: spawnData.labels,
        series: spawnData.series,
      });
      dispatch({
        type: UPDATE_CURRENT_ACTION,
        index: actionData.index,
        httpVerb: actionData.httpVerb,
        statusCode: actionData.statusCode,
        elapsedTime: actionData.elapsedTime,
      });
      console.log('This is job count', jobCount);
      console.log('This is data length', data.spawn.labels.length);
      // REMOVE COUNTER FOR PRODUCTION
      if (data.spawn.labels.length < jobCount && tempCounter < 100) {
        console.log('We are recursively calling');
        // REMOVE TEST SCENARIO FOR PRODUCTION
        const testScenarioID = 15;
        dispatch(updateLineChartData(jobCount, testScenarioID));
        // REMOVE COUNTER FOR PRODUCTION
        tempCounter++;
        console.log('tempCounter count is', tempCounter);
      }
    });
  };
};
