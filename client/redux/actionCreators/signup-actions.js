import { history } from '../store';
import { hideSignupModal } from './modal-actions';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';


/* ******* Signup Authentication Actions ******* */
export const requestSignup = () => ({
  type: SIGNUP_REQUEST,
});

export const receiveSignup = user => ({
  type: SIGNUP_SUCCESS,
  siteToken: `LoadEffect-${user.site_token}`,
});

export const signupError = message => ({
  type: SIGNUP_FAILURE,
  message,
});

export const signupUser = creds => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}&name=${creds.name}`,
  };

  return dispatch => {
    dispatch(requestSignup());

    return fetch('/api/signup', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          // Dispatch the error condition if there was a problem
          dispatch(signupError(user.message));
          return Promise.reject(user);
        } else {
          // Sets the token in local storage and route to main on success
          localStorage.setItem('id_token', user.id_token);
          history.push('/main');

          dispatch(hideSignupModal());
          dispatch(receiveSignup(user));
        }
      })
      .catch(err => console.log('Error: ', err));
  };
};
