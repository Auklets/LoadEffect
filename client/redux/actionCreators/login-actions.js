export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';

/* ******* Login Modal Actions ******* */
const showLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
  isLoginOpen: true,
});

const hideLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
  isLoginOpen: false,
});

export const openLoginModal = () => dispatch => {
  dispatch(showLoginModal());
};

export const closeLoginModal = () => dispatch => {
  dispatch(hideLoginModal());
};

/* ******* Login Authentication Actions ******* */
const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds,
});

const receiveLogin = user => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
});

const loginError = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message,
});

export const loginUser = creds => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`,
  };

  return dispatch => {
    dispatch(requestLogin(creds));

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
          // Sets the token in local storage on success
          localStorage.setItem('id_token', user.id_token);
          dispatch(hideLoginModal());
          // Dispatch the success action
          dispatch(receiveLogin(user));
        }
      })
      .catch(err => console.log('Error: ', err));
  };
};
