import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, Col, Button, Modal } from 'react-bootstrap';

class SignupModal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const name = `${this.refs.first.value.trim()} ${this.refs.last.value.trim()}`;
    const password = this.refs.password.value.trim();
    const creds = { email, name, password };
    this.props.sendSignup(creds);
  }

  render() {
    const { errorMessage, isSignupOpen, hideSignup } = this.props;

    return (
      <Modal show={isSignupOpen} onHide={hideSignup} closeButton>
        <Modal.Header>
          <Modal.Title>Signup for a new Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleClick}>
            <Col sm={6}>
              <FormGroup controlId="formInlineFirstName">
                <ControlLabel>First Name:</ControlLabel>
                {' '}
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
                {' '}
                <input
                  className="form-control"
                  ref="last"
                  type="text"
                  placeholder="Enter last name"
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineLastName">
                <ControlLabel>Password:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="password"
                  type="password"
                  placeholder="Enter password"
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineLastName">
                <ControlLabel>Enter password again:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="passwordagain"
                  type="password"
                  placeholder="Enter password again"
                />
              </FormGroup>
            </Col>

            <Col sm={12}>
              <FormGroup controlId="formInlineEmail">
                <ControlLabel>Email:</ControlLabel>
                {' '}
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
                SignUp
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

SignupModal.propTypes = {
  sendSignup: PropTypes.func,
  hideSignup: PropTypes.func,
  errorMessage: PropTypes.string,
  isSignupOpen: PropTypes.bool,
};

export default SignupModal;

