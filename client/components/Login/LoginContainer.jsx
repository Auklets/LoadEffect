import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actionCreators/login-actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    const creds = { email: email.value.trim(), password: password.value.trim() };
    this.props.dispatch(loginUser(creds));
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <Form onSubmit={this.handleClick}>
        <Grid>
          <Row className="show-grid">

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

            <Button bStyle="primary" type="submit">
              Login
            </Button>
          </Row>
        </Grid>
        {errorMessage &&
          <p style={{ color: 'red' }}>{errorMessage}</p>
        }
      </Form>
    );
  }
}

Login.propTypes = {
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

export default connect(mapStateToProps)(Login);
