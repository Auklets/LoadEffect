import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const scenarioName = this.refs.scenarioName.value.trim();
    const spawnsCount = this.refs.spawnsCount.value.trim();
    const targetURL = this.refs.targetURL.value.trim();
    const script = this.refs.script.value.trim();
    const workers = this.refs.workers.value.trim();
    const id = localStorage.get('id');

    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `id=${id}&scenarioName=${scenarioName}&spawnsCount=${spawnsCount}&targetURL=${targetURL}&script=${script}&workers=${workers}`,
    };

    fetch('/api/new-scenario', config);
  }

  render() {
    return (
      <Form onSubmit={this.handleClick}>
        <Grid>
          <Row className="show-grid">
            <Col sm={6}>
              <FormGroup controlId="formInlineFirstName">
                <ControlLabel>Test Name:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="scenarioName"
                  type="text"
                  placeholder="Enter Test name"
                  required
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineFirstName">
                <ControlLabel>Enter Number of Workers:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="workers"
                  type="number"
                  placeholder="Enter total number of workers"
                  required
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineLastName">
                <ControlLabel>Enter Total Number of Fake Users:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="spawnsCount"
                  type="number"
                  min="0"
                  placeholder="Enter total number fake users"
                  required
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineLastName">
                <ControlLabel>Enter Target Url:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="targetURL"
                  type="url"
                  placeholder="Enter target url"
                  required
                />
              </FormGroup>
            </Col>

            <Col sm={12}>
              <FormGroup controlId="formInlineEmail">
                <ControlLabel>Enter your script:</ControlLabel>
                {' '}
                <textarea
                  className="form-control"
                  ref="script"
                  type="text"
                  rows="10"
                  placeholder="Enter your script"
                  required
                />
              </FormGroup>
            </Col>

            <Button bStyle="primary" type="submit">
              Create!
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
