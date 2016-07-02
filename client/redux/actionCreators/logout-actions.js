export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
});

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  localStorage.removeItem('id_token');
  dispatch(receiveLogout());
};
