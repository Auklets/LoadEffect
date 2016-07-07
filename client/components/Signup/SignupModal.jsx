import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, Col, Button, Modal, FormControl } from 'react-bootstrap';

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordMatches: false,
      attemptSubmit: false,
      isTooShortPassword: false,
      isValid: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setValidationState = this.setValidationState.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
    this.resetStateOnType = this.resetStateOnType.bind(this);
  }

  setValidationState() {
    if (this.state.attemptSubmit) {
      return this.state.isValid ? 'success' : 'error';
    }
    return '';
  }

  setErrorMessage() {
    if (this.state.attemptSubmit && !this.state.isValid) {
      return this.state.isTooShortPassword ?
        (<p style={{ color: 'red' }}>Password length must be 8 or more characters.</p>) :
        (<p style={{ color: 'red' }}>Passwords do not match.</p>);
    }
    return null;
  }

  resetStateOnType() {
    if (!this.state.isValid) {
      this.setState({
        passwordMatches: false,
        attemptSubmit: false,
        isTooShortPassword: false,
        isValid: false,
      });
    }
  }

  handleClick(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const name = `${this.refs.first.value.trim()} ${this.refs.last.value.trim()}`;
    const password = this.refs.password.value.trim();
    const passwordAgain = this.refs.passwordagain.value.trim();
    const creds = { email, name, password };

    if (password.length < 7) {
      return this.setState({ isTooShortPassword: true, attemptSubmit: true });
    } else if (password !== passwordAgain) {
      return this.setState({ passwordMatches: false, attemptSubmit: true });
    } else {
      this.setState({ isValid: true, attemptSubmit: true });
      return this.props.sendSignup(creds);
    }
  }

  render() {
    const { isSignupOpen, hideSignup } = this.props;

    return (
      <Modal show={isSignupOpen} onHide={hideSignup} closeButton>
        <Modal.Header>
          <Modal.Title className="text-center">Signup for a new Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleClick}>
            <Col sm={6}>
              <FormGroup controlId="formInlineFirstName">
                <ControlLabel>First Name:</ControlLabel>
                <input
                  className="form-control"
                  ref="first"
                  type="text"
                  placeholder="Enter first name"
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineLastName">
                <ControlLabel>Last Name:</ControlLabel>
                <input
                  className="form-control"
                  ref="last"
                  type="text"
                  placeholder="Enter last name"
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineLastName" validationState={this.setValidationState()}>
                <ControlLabel>Create a password:</ControlLabel>
                <input
                  onChange={this.resetStateOnType}
                  className="form-control"
                  ref="password"
                  type="password"
                  placeholder="Enter password"
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineLastName" validationState={this.setValidationState()}>
                <ControlLabel>Confirm your password:</ControlLabel>
                <input
                  onChange={this.resetStateOnType}
                  className="form-control"
                  ref="passwordagain"
                  type="password"
                  placeholder="Enter password again"
                />
                <FormControl.Feedback />
              </FormGroup>
            </Col>

            <Col sm={12}>
              <FormGroup controlId="formInlineEmail">
                <ControlLabel>Email:</ControlLabel>
                <input
                  className="form-control"
                  ref="email"
                  type="email"
                  placeholder="Enter a valid email address"
                />
              </FormGroup>
            </Col>
            <Col smOffset={5}>
              <Button bStyle="primary" type="submit">
                Sign Up
              </Button>
            </Col>
            {this.setErrorMessage()}
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

SignupModal.propTypes = {
  sendSignup: PropTypes.func,
  hideSignup: PropTypes.func,
  isSignupOpen: PropTypes.bool,
};

export default SignupModal;

