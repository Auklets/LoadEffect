import { hideLoginModal } from './modal-actions';
import { sendRequestThenDispatch } from '../../lib/utils.js';

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

  return sendRequestThenDispatch('/api/login', config, loginError, hideLoginModal, receiveLogin);
};
