export const UPDATE_DATA = 'UPDATE_DATA';

// CONSIDER SOCKETS FOR MORE REAL_TIME DATA
  // Start with HTPP Request

// Update line chart data
export const updateLineChartData = (jobCount, scenarioID) => {
  const token = localStorage.getItem('id_token');
  const serverEndPoint = '/api/resultsdata';
  const config = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentScenarioID: scenarioID
    }),
  };
  return dispatch =>
    fetch(serverEndPoint, config)
      .then(response => response.json()
        .then(res => {
          dispatch({
            type: UPDATE_DATA,
            labels: res.labels,
            series: res.series,
          });
          if (jobCount <= res.labels.length) {
            updateLineChartData(jobCount, scenarioID);
          }
        }
      )
    ).catch(err => console.log('Error: ', err));
};
      // Function to make HTTP Request asking for data
  // If data exists
    // Dispatch to update state
    // Do another http request to ask for more data
  // Base case is when # of results = number of users requested
// Downside: Speed constrained to speed of network

export const updateFromInput = (inputLabels, inputSeries) =>
  dispatch =>
    dispatch({
      type: UPDATE_DATA,
      labels: inputLabels,
      series: inputSeries,
    });
