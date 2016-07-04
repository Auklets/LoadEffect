import React, { PropTypes } from 'react';
import { panelBackgroundColor, centerItems } from '../ResultsCSS.jsx';
import { Panel, Col } from 'react-bootstrap';

const TestSummary = (props) => (
  <Panel bsStyle="primary" style={panelBackgroundColor} header={'Test Summary'}>
    <Col xs={6} md={3}>
      <p style={centerItems}>Test Name: {props.currentScenarioName}</p>
    </Col>
    <Col xs={6} md={3}>
      <p style={centerItems}>Number of Workers: {props.currentWorkers}</p>
    </Col>
    <Col xs={6} md={3}>
      <p style={centerItems}>Fake Users: {props.currentSpawnsCount}</p>
    </Col>
    <Col xs={6} md={3}>
      <p style={centerItems}>Target URL: {props.currentTargetURL}</p>
    </Col>
  </Panel>
);

TestSummary.propTypes = {
  currentScenarioName: PropTypes.string.isRequired,
  currentWorkers: PropTypes.number.isRequired,
  currentSpawnsCount: PropTypes.number.isRequired,
  currentTargetURL: PropTypes.string.isRequired,
};

export default TestSummary;
