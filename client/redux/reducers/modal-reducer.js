import { TOGGLE_LOGIN_MODAL } from '../actionCreators/login-actions';
import { TOGGLE_SIGNUP_MODAL } from '../actionCreators/signup-actions';
import { TOGGLE_SCENARIO_MODAL } from '../actionCreators/scenario-actions';

const initialState = {
  isLoginOpen: false,
  isSignupOpen: false,
  isScenarioModalOpen: false,
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

    default:
      return state;
  }
};
