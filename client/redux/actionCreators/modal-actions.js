export const TOGGLE_SCENARIO_MODAL = 'TOGGLE_SCENARIO_MODAL';
export const TOGGLE_VERIFY_MODAL = 'TOGGLE_VERIFY_MODAL';
export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const TOGGLE_SIGNUP_MODAL = 'TOGGLE_SIGNUP_MODAL';


/* ******* Login Modal Actions ******* */
export const showLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
  isLoginOpen: true,
});

export const hideLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
  isLoginOpen: false,
});

export const openLoginModal = () => dispatch => {
  dispatch(showLoginModal());
};

export const closeLoginModal = () => dispatch => {
  dispatch(hideLoginModal());
};


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


/* ******** Website Validation Modal Actions  ******** */
export const showVerifyModal = () => ({
  type: TOGGLE_VERIFY_MODAL,
  isVerifyModalOpen: true,
});

export const hideVerifyModal = () => ({
  type: TOGGLE_VERIFY_MODAL,
  isVerifyModalOpen: false,
});

export const openVerifyModal = () => dispatch => {
  dispatch(showVerifyModal());
};

export const closeVerifyModal = () => dispatch => {
  dispatch(hideVerifyModal());
};


/* ******** Scenario Modal Actions  ******** */
export const showScenarioModal = () => ({
  type: TOGGLE_SCENARIO_MODAL,
  isScenarioModalOpen: true,
});

export const hideScenarioModal = () => ({
  type: TOGGLE_SCENARIO_MODAL,
  isScenarioModalOpen: false,
});

export const openScenarioModal = () => dispatch => {
  dispatch(showScenarioModal());
};

export const closeScenarioModal = () => dispatch => {
  dispatch(hideScenarioModal());
};
