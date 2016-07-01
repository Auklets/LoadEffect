import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import { Form, Button, ControlLabel, Grid, Row, Table, Panel, Col } from 'react-bootstrap';
import { panelBackgroundColor, centerItems, centerItemsTop } from './LiveResultsCSS.jsx';
import { calculateAverage, sumArray, percentCompletion } from './LiveResultsHelpers.jsx';

class LiveResults extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Variable for total jobs
    // const testTotalSpawns = 5;
    // const testScenarioID = 15;
    const totalSpawns = props.currentSpawnsCount;
    const currentScenarioID = props.currentScenarioID;

    // console.log('This is props', props);

    // console.log('Current spawns count', props.currentSpawnsCount);
    // console.log('Current Scenario ID', props.currentScenarioID);
    // Continue to fetch until total jobs equals data length
    // this.props.updateLineChartData(totalSpawns, currentScenarioID);
  }

  handleSubmit(e) {
    e.preventDefault();
    const labelData = JSON.parse(this.refs.label.value);
    const seriesData = JSON.parse(this.refs.series.value);
    this.props.updateData(labelData, seriesData);
  }

  render() {
    const { labels, series, currentSpawnsCount, elapsedTime, httpVerb, index, statusCode } = this.props;
    /* ****** Chartist Configurations ****** */
    const simpleLineChartData = {
      labels,
      series: [series],
    };
    console.log(simpleLineChartData);
    const lineChartOptions = {
      low: 0,
      showArea: true,
    };

    /* ****** Table Calculations ****** */
    const averageElapsedTime = Math.round(calculateAverage(elapsedTime) * 100) / 100;
    const numberActions = httpVerb.length;
    const currentSpawns = labels.length;
    const percentComplete = percentCompletion(currentSpawnsCount, labels.length);

    return (
      <Grid>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor} header={'Test Summary'}>
            <Col xs={6} md={3}>
              <p style={centerItems}>Test Name: {this.props.currentScenarioName}</p>
            </Col>
            <Col xs={6} md={3}>
              <p style={centerItems}>Number of Workers: {this.props.currentWorkers}</p>
            </Col>
            <Col xs={6} md={3}>
              <p style={centerItems}>Fake Users: {this.props.currentSpawnsCount}</p>
            </Col>
            <Col xs={6} md={3}>
              <p style={centerItems}>Target URL: {this.props.currentTargetURL}</p>
            </Col>
          </Panel>
        </Row>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor} header={'General Statistics'}>
            <Col xs={6} md={3}>
              <Row style={centerItemsTop}>{averageElapsedTime}</Row>
              <Row style={centerItems}>Average Elapsed Time</Row>
            </Col>
            <Col xs={6} md={3}>
              <Row style={centerItemsTop}>{numberActions}</Row>
              <Row style={centerItems}>Requests / Actions Made</Row>
            </Col>
            <Col xs={6} md={3}>
              <Row style={centerItemsTop}>{currentSpawns}</Row>
              <Row style={centerItems}>Current Spawns</Row>
            </Col>
            <Col xs={6} md={3}>
              <Row style={centerItemsTop}>{percentComplete}%</Row>
              <Row style={centerItems}>Percent Completion</Row>
            </Col>
          </Panel>
        </Row>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor}>
            <Form onSubmit={this.handleSubmit}>
              <div>
                <ControlLabel>Labels</ControlLabel>
                <input
                  className="form-control"
                  ref="label"
                  type="text"
                  placeholder="Enter an array of data"
                />
              </div>
              <div>
                <ControlLabel>Series</ControlLabel>
                <input
                  className="form-control"
                  ref="series"
                  type="text"
                  placeholder="Enter an array of data"
                />
              </div>
              <Button type="submit">Submit</Button>
            </Form>
          </Panel>
        </Row>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor}>
            <div style={{ backgroundColor: 'white' }}>
              <ChartistGraph data={simpleLineChartData} options={lineChartOptions} type={'Line'} />
            </div>
          </Panel>
        </Row>
        <Row className="show-grid">
          <Panel bsStyle="primary">
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Type</th>
                  <th>Status Code</th>
                  <th>Elapsed Time</th>
                </tr>
              </thead>
              <tbody>
                {index.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item}</td>
                      <td>{httpVerb[i]}</td>
                      <td>{statusCode[i]}</td>
                      <td>{elapsedTime[i]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Panel>
        </Row>
      </Grid>
    );
  }
}

LiveResults.propTypes = {
  labels: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
  updateLineChartData: PropTypes.func.isRequired,
  allScenarios: PropTypes.object.isRequired,
  currentSpawnsCount: PropTypes.number.isRequired,
  currentScenarioID: PropTypes.number.isRequired,
  currentScenarioName: PropTypes.string.isRequired,
  currentWorkers: PropTypes.number.isRequired,
  currentTargetURL: PropTypes.string.isRequired,
  httpVerb: PropTypes.array.isRequired,
  elapsedTime: PropTypes.array.isRequired,
};

export default LiveResults;
