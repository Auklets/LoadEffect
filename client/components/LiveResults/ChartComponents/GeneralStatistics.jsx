import React, { PropTypes } from 'react';
import { panelBackgroundColor, centerItems, centerItemsTop } from '../LiveResultsCSS.jsx';
import { Panel, Col, Row } from 'react-bootstrap';

const GeneralStatistics = (props) => (
  <Panel bsStyle="primary" style={panelBackgroundColor} header={'General Statistics'}>
    <Col xs={6} md={3}>
      <Row style={centerItemsTop}>{props.averageElapsedTime}</Row>
      <Row style={centerItems}>Average Elapsed Time</Row>
    </Col>
    <Col xs={6} md={3}>
      <Row style={centerItemsTop}>{props.numberActions}</Row>
      <Row style={centerItems}>Requests / Actions Made</Row>
    </Col>
    <Col xs={6} md={3}>
      <Row style={centerItemsTop}>{props.currentSpawns}</Row>
      <Row style={centerItems}>Current Users</Row>
    </Col>
    <Col xs={6} md={3}>
      <Row style={centerItemsTop}>{props.numberErrors}</Row>
      <Row style={centerItems}># of Errors</Row>
    </Col>
  </Panel>
);

GeneralStatistics.propTypes = {
  averageElapsedTime: PropTypes.number.isRequired,
  numberActions: PropTypes.number.isRequired,
  currentSpawns: PropTypes.number.isRequired,
  numberErrors: PropTypes.number.isRequired,
};

export default GeneralStatistics;
