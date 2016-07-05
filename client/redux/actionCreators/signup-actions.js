import { hideSignupModal } from './modal-actions';
import { sendRequestThenDispatch } from '../../lib/utils.js';

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
  return sendRequestThenDispatch('/api/signup', config, signupError, hideSignupModal, receiveSignup);
};
