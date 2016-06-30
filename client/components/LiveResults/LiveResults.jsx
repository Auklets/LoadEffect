import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import { Form, Button, ControlLabel } from 'react-bootstrap';

class LiveResults extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Variable for total jobs
    const testTotalSpawns = 5; // TODO - Need to get the right job count from state
    const totalSpawns = props.state.allScenario.currentSpawnsCount;
    const testScenarioID = 15;
    const currentScenarioID = props.state.allScenario.currentScenarioID;

    console.log('Current worker count', props.state.allScenario.currentSpawnsCount);
    console.log('Current Scenario ID', props.state.allScenario.currentScenarioID);
    // Continue to fetch until total jobs equals data length
    this.props.updateLineChartData(totalSpawns, testScenarioID);
  }

  handleSubmit(e) {
    e.preventDefault();
    const labelData = JSON.parse(this.refs.label.value);
    const seriesData = JSON.parse(this.refs.series.value);
    this.props.updateData(labelData, seriesData);
  }

  render() {
    const simpleLineChartData = {
      labels: this.props.state.charts.labels,
      series: [this.props.state.charts.series],
    };
    console.log(simpleLineChartData);
    const lineChartOptions = {
      low: 0,
      showArea: true,
    };
    return (
      <div>
        {'This is the # of attacks and elapsed Time chart'}
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
        <div style={{ backgroundColor: 'white' }}>
          <ChartistGraph data={simpleLineChartData} options={lineChartOptions} type={'Line'} />
        </div>
      </div>
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
};

export default LiveResults;
