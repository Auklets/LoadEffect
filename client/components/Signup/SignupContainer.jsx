import React from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../../redux/actionCreators/signup-actions';
import { closeSignupModal } from '../../redux/actionCreators/modal-actions';

import SignupModal from './SignupModal.jsx';

export const SignupContainer = props => (
  <SignupModal className="signup-modal" {...props} />
);

const mapStateToProps = state => {
  const { auth, modal } = state;
  const { isAuthenticated } = auth;
  const { isSignupOpen } = modal;

  return {
    isSignupOpen,
    isAuthenticated,
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

