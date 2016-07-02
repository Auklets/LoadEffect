import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import { Form, Button, ControlLabel, Grid, Row, Table, Panel, Col, Label } from 'react-bootstrap';

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
    const { labels, series } = this.props;
    const simpleLineChartData = {
      labels,
      series: [series],
    };
    console.log(simpleLineChartData);
    const lineChartOptions = {
      low: 0,
      showArea: true,
    };

    // Panel Formatting
    const panelBackgroundColor = {
      color: 'black',
      backgroundColor: 'white',
    };

    const centerItems = {
      display: 'flex',
      justifyContent: 'center',
    };

    return (
      <Grid>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor} header={'Test Summary'}>
            <span>
              <p>Test Name: {this.props.currentScenarioName}</p>
              <p>Number of Workers: {this.props.currentWorkers}</p>
              <p>Fake Users: {this.props.currentSpawnsCount}</p>
              <p>Target URL: {this.props.currentTargetURL}</p>
            </span>
          </Panel>
        </Row>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor} header={'General Statistics'}>
            <Col xs={6} md={3}>
              <Row style={centerItems}>[4]</Row>
              <Row style={centerItems}>Average Elapsed Time</Row>
            </Col>
            <Col xs={6} md={3}>
              <Row style={centerItems}>[5]</Row>
              <Row style={centerItems}>Requests Made</Row>
            </Col>
            <Col xs={6} md={3}>
              <Row style={centerItems}>[50]</Row>
              <Row style={centerItems}>Data Received</Row>
            </Col>
            <Col xs={6} md={3}>
              <Row style={centerItems}>[50]</Row>
              <Row style={centerItems}>Active Spawns</Row>
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
                  <th>Type</th>
                  <th>Name</th>
                  <th>Average Time</th>
                  <th>Number of Fails</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DUMMY</td>
                  <td>DUMMY</td>
                  <td>DUMMY</td>
                  <td>DUMMY</td>
                </tr>
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
};

export default LiveResults;
