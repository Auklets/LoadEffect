import { history } from '../store';
import { hideLoginModal } from './modal-actions';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


/* ******* Login Authentication Actions ******* */
export const requestLogin = () => ({
  type: LOGIN_REQUEST,
});

export const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  siteToken: `LoadEffect-${user.site_token}`,
});

export const loginError = message => ({
  type: LOGIN_FAILURE,
  message,
});

export const loginUser = creds => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`,
  };

  return dispatch => {
    dispatch(requestLogin());

    return fetch('/api/login', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          // Dispatch the error condition if there was a problem
          dispatch(loginError(user.message));
          return Promise.reject(user);
        } else {
          // Sets the token in local storage and route to main on success
          localStorage.setItem('id_token', user.id_token);
          history.push('/main');
          dispatch(hideLoginModal());
          dispatch(receiveLogin(user));
        }
      })
      .catch(err => console.log('Error: ', err));
  };
};
