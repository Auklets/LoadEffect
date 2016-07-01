// React/Redux/Router/Bootstrap
import React from 'react';
import { connect } from 'react-redux';

// Dispatched actions
import { openLoginModal } from '../../redux/actionCreators/login-actions';
import { openSignupModal } from '../../redux/actionCreators/signup-actions';
import { logoutUser } from '../../redux/actionCreators/logout-actions';

import Navigation from './Navigation.jsx';

export const NavigationContainer = (props) => (
  <Navigation {...props} />
);

const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isLoginOpen: state.isLoginOpen,
    isSignupOpen: state.isSignupOpen,
    isScenarioOpen: state.isScenarioOpen,
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  showLogin() {
    dispatch(openLoginModal());
  },

  showSignup() {
    dispatch(openSignupModal());
  },

  handleClick() {
    dispatch(logoutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
