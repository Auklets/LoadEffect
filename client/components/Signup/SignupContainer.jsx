import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { signupUser } from '../../redux/actionCreators/signup-actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const email = this.refs.email;
    const first = this.refs.first;
    const last = this.refs.last;
    const password = this.refs.password;

    const creds = {
      email: email.value.trim(),
      name: `${first.value.trim()} ${last.value.trim()}`,
      password: password.value.trim(),
    };
    this.props.dispatch(signupUser(creds));
  }

  render() {
    return (
      <Form onSubmit={this.handleClick}>
        <Grid>
          <Row className="show-grid">
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

            <Button bStyle="primary" type="submit">
              SignUp
            </Button>
          </Row>
        </Grid>
      </Form>
    );
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    data: state.data,
    isAuthenticated,
    errorMessage,
  };
};

export default connect(mapStateToProps)(Signup);
