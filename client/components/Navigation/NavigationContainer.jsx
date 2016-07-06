// React/Redux/Router/Bootstrap
import React from 'react';
import { connect } from 'react-redux';

// Dispatched actions
import { openLoginModal, openSignupModal, openVerifyModal } from '../../redux/actionCreators/modal-actions';
import { logoutUser } from '../../redux/actionCreators/logout-actions';

import Navigation from './Navigation.jsx';

export const NavigationContainer = (props) => (
  <Navigation {...props} />
);

const mapStateToProps = (state) => {
  const { auth, scenario, isLoginOpen, isSignupOpen, isScenarioOpen } = state;
  const { isAuthenticated } = auth;
  const { allScenarios } = scenario;

  return {
    isLoginOpen,
    isSignupOpen,
    isScenarioOpen,
    allScenarios,
    isAuthenticated,
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

  showVerifyModal() {
    dispatch(openVerifyModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
