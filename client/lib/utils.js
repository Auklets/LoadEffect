import { history } from '../redux/store';

export const sendRequestThenDispatch = (endpoint, config, ...actions) =>
  dispatch => {
    if (/signup|login$/i.test(endpoint)) {
      // We need to make sure to remove this error action from actions so it
      // doesn't get invoked in the success case.
      const errorAction = actions.splice(0, 1);

      fetch(endpoint, config)
        .then(response => response.json()
          .then(user => ({ user, response }))
        )
        .then(({ user, response }) => {
          if (!response.ok) {
            dispatch(errorAction(user.message));
            return Promise.reject(user);
          } else {
            localStorage.setItem('id_token', user.id_token);
            history.push('/main');

            // Dispatch actions on success to update state
            actions.forEach(action => dispatch(action(user)));
          }
        })
        .catch(err => console.log('Error sending request:', err));
    } else {
      fetch(endpoint, config)
        .then(response => response.json()
          .then(res => actions.forEach(action => dispatch(action(res)))
          )
        )
        .catch(err => console.log('Error sending request:', err));
    }
  };
