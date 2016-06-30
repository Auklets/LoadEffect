import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, ControlLabel, Col, Button, Modal } from 'react-bootstrap';

// Dispatched actions
import { loginUser, closeLoginModal } from '../../redux/actionCreators/login-actions';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    const creds = { email: email.value.trim(), password: password.value.trim() };
    this.props.sendLogin(creds);
  }

  render() {
    const { errorMessage, isLoginOpen, hideLogin } = this.props;

    return (
      <Modal show={isLoginOpen} onHide={hideLogin} closeButton>
        <Modal.Header>
          <Modal.Title>Login To Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleClick}>
            <Col sm={12}>
              <FormGroup controlId="formInlineEmail">
                <ControlLabel>Email:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </FormGroup>
            </Col>

            <Col sm={12}>
              <FormGroup controlId="formInlineEmail">
                <ControlLabel>Password:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </FormGroup>
            </Col>
            <Col smOffset={5}>
              <Button bStyle="primary" type="submit">
                Login
              </Button>
            </Col>
            {errorMessage &&
              <p style={{ color: 'red' }}>{errorMessage}</p>
            }
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  errorMessage: PropTypes.string,
  hideLogin: PropTypes.func,
  sendLogin: PropTypes.func,
  isLoginOpen: PropTypes.bool,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
