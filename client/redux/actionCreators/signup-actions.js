export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const TOGGLE_SIGNUP_MODAL = 'TOGGLE_SIGNUP_MODAL';


/* ******** Signup Modal Actions  ******** */
export const showSignupModal = () => ({
  type: TOGGLE_SIGNUP_MODAL,
  isSignupOpen: true,
});

export const hideSignupModal = () => ({
  type: TOGGLE_SIGNUP_MODAL,
  isSignupOpen: false,
});

export const openSignupModal = () => dispatch => {
  dispatch(showSignupModal());
};

export const closeSignupModal = () => dispatch => {
  dispatch(hideSignupModal());
};


/* ******* Signup Authentication Actions ******* */
export const receiveSignup = user => ({
  type: SIGNUP_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
});

export const requestSignup = creds => ({
  type: SIGNUP_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds,
});

export const signupError = message => ({
  type: SIGNUP_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message,
});

export const signupUser = creds => {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}&name=${creds.name}`,
  };

  return dispatch => {
    dispatch(requestSignup(creds));

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
          // Sets the token in local storage on success
          localStorage.setItem('id_token', user.id_token);

          // Dispatch the success action
          dispatch(hideSignupModal());
          dispatch(receiveSignup(user));
        }
      })
      .catch(err => console.log('Error: ', err));
  };
};
