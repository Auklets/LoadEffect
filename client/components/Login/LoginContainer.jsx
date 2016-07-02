import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../redux/actionCreators/login-actions';
import { closeLoginModal } from '../../redux/actionCreators/modal-actions';

import LoginModal from './LoginModal.jsx';

export const LoginContainer = props => (
  <LoginModal {...props} />
);

const mapStateToProps = state => {
  const { auth, modal } = state;
  const { isAuthenticated, errorMessage } = auth;
  const { isLoginOpen, isSignupOpen } = modal;

  return {
    isLoginOpen,
    isSignupOpen,
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  hideLogin() {
    dispatch(closeLoginModal());
  },

  sendLogin(creds) {
    dispatch(loginUser(creds));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
