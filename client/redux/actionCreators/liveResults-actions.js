import axios from 'axios';

export const UPDATE_DATA = 'UPDATE_DATA';

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
        dispatch({
          type: UPDATE_DATA,
          labels: res.data.spawn.labels,
          series: res.data.spawn.series,
        });
        console.log('This is job count', jobCount);
        console.log('This is data length', res.data.labels.length);
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
      type: UPDATE_DATA,
      labels: inputLabels,
      series: inputSeries,
    });
