import React from 'react';
import { connect } from 'react-redux';

import { openLoginModal, openSignupModal } from '../../redux/actionCreators/modal-actions';
import Home from './Home.jsx';

export const HomeContainer = (props) => (
  <Home {...props} />
);

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
