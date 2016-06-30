export const UPDATE_DATA = 'UPDATE_DATA';

// CONSIDER SOCKETS FOR MORE REAL_TIME DATA
  // Start with HTPP Request

// Update line chart data
export const updateLineChartData = () => {
  const token = localStorage.getItem('id_token');
  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return dispatch =>
    // TBD
    fetch('/api/spawn', config)
      .then(response => response.json()
        .then(res => {
          dispatch({
            type: UPDATE_DATA,
            labels: res.labels,
            series: res.series,
          });
        }
      )
    );
};

export const updateFromInput = (inputLabels, inputSeries) =>
  dispatch =>
    dispatch({
      type: UPDATE_DATA,
      labels: inputLabels,
      series: inputSeries,
    });
