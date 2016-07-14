import { TOGGLE_SCENARIO_MODAL, TOGGLE_VERIFY_MODAL, TOGGLE_LOGIN_MODAL, TOGGLE_SIGNUP_MODAL, TOGGLE_DEMO_MODAL } from '../actionCreators/modal-actions';

const initialState = {
  isLoginOpen: false,
  isSignupOpen: false,
  isScenarioModalOpen: false,
  isDemoModalOpen: false,
  isVerifyModalOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return Object.assign({}, state, {
        isLoginOpen: action.isLoginOpen,
      });

    case TOGGLE_SIGNUP_MODAL:
      return Object.assign({}, state, {
        isSignupOpen: action.isSignupOpen,
      });

    case TOGGLE_SCENARIO_MODAL:
      return Object.assign({}, state, {
        isScenarioModalOpen: action.isScenarioModalOpen,
      });

    case TOGGLE_VERIFY_MODAL:
      return Object.assign({}, state, {
        isVerifyModalOpen: action.isVerifyModalOpen,
      });

    case TOGGLE_DEMO_MODAL:
      return Object.assign({}, state, {
        isDemoModalOpen: action.isDemoModalOpen,
      });

    default:
      return state;
  }
};
