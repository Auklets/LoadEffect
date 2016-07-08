import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, Col, Button, Modal, Row } from 'react-bootstrap';

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
          <Modal.Title className="text-center">Login To Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleClick}>

            <Row>
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
            </Row>

            <Row>
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
            </Row>

            <Row className="text-center">
              <Col sm={12}>
                <Button className="login-button" bStyle="primary" type="submit">
                  Login
                </Button>
              </Col>
            </Row>
            <br />
            <Row className="text-center">
              <Col sm={12}>
                {errorMessage &&
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                }
              </Col>
            </Row>

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

export default LoginModal;
