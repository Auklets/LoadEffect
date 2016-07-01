import axios from 'axios';

export const UPDATE_LINE_CHART = 'UPDATE_LINE_CHART';
export const UPDATE_CURRENT_ACTION = 'UPDATE_CURRENT_ACTION';

// CONSIDER SOCKETS FOR MORE REAL_TIME DATA
  // Start with HTPP Request

// Update line chart data
export const updateLineChartData = (jobCount, scenarioID) => {
  console.log('We have called updateLineChartData');
  // const token = localStorage.getItem('id_token');
  const serverEndPoint = '/api/resultsdata';

  return dispatch =>
    axios.post(serverEndPoint, { currentScenarioID: scenarioID })
      .then(res => {
        console.log('This is the response from the server', res);
        const spawnData = res.data.spawn;
        const actionData = res.data.action;
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
        console.log('This is data length', res.data.spawn.labels.length);
        if (res.data.labels.length < jobCount) {
          console.log('We are recursively calling');
          dispatch(updateLineChartData(jobCount, scenarioID));
        }
      }
    ).catch(err => console.log('Error: ', err));
};

export const updateFromInput = (inputLabels, inputSeries) =>
  dispatch =>
    dispatch({
      type: UPDATE_LINE_CHART,
      labels: inputLabels,
      series: inputSeries,
    });
