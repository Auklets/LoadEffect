import React from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../../redux/actionCreators/signup-actions';
import { closeSignupModal } from '../../redux/actionCreators/modal-actions';

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

