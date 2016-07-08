import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, ControlLabel, Col, Button, Well, Grid } from 'react-bootstrap';
import ApiReference from '../ApiReference/ApiReference.jsx';


class NewScenario extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.checkScript = this.checkScript.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  resetFields() {
    this.refs.scenarioName.value = '';
    this.refs.spawnsCount.value = '';
    this.refs.targetURL.value = '';
    this.refs.script.value = '';
    this.refs.workers.value = '';
  }

  handleClick(e) {
    e.preventDefault();
    const fullURL = this.refs.targetURL.value.trim();
    const targetURL = fullURL.replace(/^https?:\/\/|www\./gi, '');
    const scenarioName = this.refs.scenarioName.value.trim();
    const spawnsCount = this.refs.spawnsCount.value.trim();
    const script = this.refs.script.value.trim();
    const workers = this.refs.workers.value.trim();
    const data = { scenarioName, spawnsCount, targetURL, script, workers };

    this.resetFields();
    this.props.sendScenario(data);
  }

  checkScript(e) {
    e.preventDefault();
    const script = this.refs.script.value.trim();
    this.props.validateScript(script);
  }

  render() {
    const { errorMessage, isValidScript, attemptedCheck, resetValidation, scriptMessage } = this.props;

    const ScriptValidationMessage = () => {
      if (attemptedCheck) {
        return isValidScript ?
          (<p style={{ color: 'green' }}>Your script passes! Go ahead and submit.</p>) :
          (<div>
            <p style={{ color: 'red' }}>Invalid script:</p>
            <p style={{ color: 'red' }}>{scriptMessage}</p>
          </div>);
      }
      return null;
    };

    return (
      <div className="container-fluid scenario-view">
        <Col sm={6}>
          <Grid fluid>
            <Col sm={12}>
              <Well bsSize="small" className="text-center">
                <h1>Create a Scenario</h1>
              </Well>
            </Col>

            <Col sm={12}>
              <Form onSubmit={isValidScript ? this.handleClick : this.checkScript}>
                <Col sm={6}>
                  <FormGroup controlId="formInlineTestName">
                    <ControlLabel>Scenario Name:</ControlLabel>
                    <input
                      className="form-control"
                      ref="scenarioName"
                      type="text"
                      placeholder="Enter a scenario name"
                      required
                    />
                  </FormGroup>
                </Col>

                <Col sm={6}>
                  <FormGroup controlId="formInlineWorkers">
                    <ControlLabel>Number of Workers:</ControlLabel>
                    <input
                      className="form-control"
                      ref="workers"
                      type="number"
                      placeholder="Enter number of workers"
                      required
                    />
                  </FormGroup>
                </Col>

                <Col sm={6}>
                  <FormGroup controlId="formInlineSpawnsCount">
                    <ControlLabel>Number of Users to Simulate:</ControlLabel>
                    <input
                      className="form-control"
                      ref="spawnsCount"
                      type="number"
                      min="0"
                      placeholder="Enter number of users to simulate"
                      required
                    />
                  </FormGroup>
                </Col>

                <Col sm={6}>
                  <FormGroup controlId="formInlineTargetURL">
                    <ControlLabel>Target URL:</ControlLabel>
                    <input
                      className="form-control"
                      ref="targetURL"
                      type="url"
                      placeholder="Enter target url e.g. http://yourwebsite.com"
                      required
                    />
                  </FormGroup>
                </Col>

                <Col sm={12}>
                  <FormGroup controlId="formInlineScript">
                    <ControlLabel>Script:</ControlLabel>
                    <textarea
                      className="form-control"
                      onChange={resetValidation}
                      ref="script"
                      type="text"
                      rows="10"
                      placeholder="Enter your script"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col className="text-center lead" sm={12}>
                  <Button bsSize="large" bsStyle="primary" type="submit">
                    {isValidScript ? 'Submit' : 'Validate Script'}
                  </Button>
                  <ScriptValidationMessage />
                </Col>
                {errorMessage &&
                  <p style={{ color: 'red' }}>{errorMessage}</p>
                }
              </Form>
            </Col>
          </Grid>
        </Col>

        <Col sm={6}>
          <ApiReference />
        </Col>
      </div>
    );
  }
}

NewScenario.propTypes = {
  sendScenario: PropTypes.func,
  validateScript: PropTypes.func,
  resetValidation: PropTypes.func,
  errorMessage: PropTypes.string,
  scriptMessage: PropTypes.string,
  attemptedCheck: PropTypes.bool,
  isValidScript: PropTypes.bool,
};

export default NewScenario;

