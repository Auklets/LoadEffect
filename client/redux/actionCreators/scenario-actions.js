export const GET_SCENARIOS = 'GET_SCENARIOS';

export const getData = () => {
  const config = {
    method: 'GET',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded',
               id_user: localStorage.getItem('id') },
  };

  return dispatch =>
    fetch('/api/scenarios', config)
      .then(response => response.json()
        .then((res) => {
          dispatch({
            type: GET_SCENARIOS,
            allScenarios: JSON.parse(res),
          });
        })
      );
};
