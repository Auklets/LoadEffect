const BASE_URL = 'http://localhost:8000/api/';

const callApi = (endpoint, authenticated) => {
  const token = localStorage.getItem('id_token') || null;
  let config = {};

  if (authenticated) {
    if (token) {
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    } else {
      console.log('No token saved!');
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text()
      .then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text);
      }

      return text;
    })
    .catch(err => console.log(err));
};

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types, authenticated } = callAPI;

  const [requestType, successType, errorType] = types;

  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType,
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType,
    })
  );
};
