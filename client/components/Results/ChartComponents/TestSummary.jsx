import React, { PropTypes } from 'react';
import { panelBackgroundColor, centerItems, centerItemsTop } from '../ResultsCSS.jsx';
import { Panel, Col, Row } from 'react-bootstrap';

const TestSummary = (props) => (
  <Panel bsStyle="primary" style={panelBackgroundColor} header={'Test Summary'}>
    <Col xs={6} md={3}>
      <Row style={centerItemsTop}>{props.currentScenarioName}</Row>
      <Row style={centerItems}>Test Name</Row>
    </Col>
    <Col xs={6} md={3}>
      <Row style={centerItemsTop}>{props.currentWorkers}</Row>
      <Row style={centerItems}>Number of Workers</Row>
    </Col>
    <Col xs={6} md={3}>
      <Row style={centerItemsTop}>{props.currentSpawnsCount}</Row>
      <Row style={centerItems}>Fake Users</Row>
    </Col>
    <Col xs={6} md={3}>
      <Row style={centerItemsTop}>{props.currentTargetURL ? props.currentTargetURL : 'None' }</Row>
      <Row style={centerItems}>Target URL</Row>
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
