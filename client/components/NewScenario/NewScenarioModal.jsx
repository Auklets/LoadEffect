import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createScenario, closeScenarioModal } from '../../redux/actionCreators/scenario-actions';

class NewScenarioModal extends Component {
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
    const data = { scenarioName, spawnsCount, targetURL, script, workers };
    this.props.sendScenario(data);
  }

  render() {
    const { errorMessage, isScenarioOpen, hideScenario } = this.props;
    return (
      <Modal show={isScenarioOpen} onHide={hideScenario} closeButton>
        <Modal.Header>
          <Modal.Title>Create a new Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleClick}>
            <Col sm={6}>
              <FormGroup controlId="formInlineTestName">
                <ControlLabel>Test Name:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="scenarioName"
                  type="text"
                  placeholder="Enter Test name"
                  value="Load Test 1"
                  required
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineWorkers">
                <ControlLabel>Enter Number of Workers:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="workers"
                  type="number"
                  placeholder="Enter total number of workers"
                  value="2"
                  required
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineSpawnsCount">
                <ControlLabel>Enter Total Number of Fake Users:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="spawnsCount"
                  type="number"
                  min="0"
                  placeholder="Enter total number fake users"
                  value="20"
                  required
                />
              </FormGroup>
            </Col>

            <Col sm={6}>
              <FormGroup controlId="formInlineTargetURL">
                <ControlLabel>Enter Target Url:</ControlLabel>
                {' '}
                <input
                  className="form-control"
                  ref="targetURL"
                  type="url"
                  placeholder="Enter target url"
                  value="http://45.55.183.145"
                  required
                />
              </FormGroup>
            </Col>

            <Col sm={12}>
              <FormGroup controlId="formInlineScript">
                <ControlLabel>Enter your script:</ControlLabel>
                {' '}
                <textarea
                  className="form-control"
                  ref="script"
                  type="text"
                  rows="10"
                  placeholder="Enter your script"
                  value="get('/');"
                  required
                />
              </FormGroup>
            </Col>
            <Col smOffset={5}>
              <Button bStyle="primary" type="submit">
                Create!
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

NewScenarioModal.propTypes = {
  sendScenario: PropTypes.func,
  hideScenario: PropTypes.func,
  errorMessage: PropTypes.string,
  isScenarioOpen: PropTypes.bool,
};

const mapStateToProps = state => {
  const { auth, modal } = state;
  const { isAuthenticated, errorMessage } = auth;
  const { isScenarioOpen } = modal;

  return {
    isScenarioOpen,
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  hideScenario() {
    dispatch(closeScenarioModal());
  },

  sendScenario(creds) {
    dispatch(createScenario(creds));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewScenarioModal);

