import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../redux/store';

import { signupUser, closeSignupModal } from '../../redux/actionCreators/signup-actions';

import SignupModal from './SignupModal.jsx';

export const SignupContainer = props => (
  <SignupModal {...props} />
);

const mapStateToProps = state => {
  const { auth, modal } = state;
  const { isAuthenticated, errorMessage } = auth;
  const { isSignupOpen } = modal;

  return {
    isSignupOpen,
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  hideSignup() {
    dispatch(closeSignupModal());
  },
  sendSignup(creds) {
    dispatch(signupUser(creds));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);

