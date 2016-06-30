import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import { updateFromInput } from '../../redux/actionCreators/liveResults-actions';
import { Form, Button, ControlLabel } from 'react-bootstrap';

class LiveResults extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
    this.handleSubmit = this.handleSubmit.bind(this);

    // Function to make HTTP Request asking for data
      // If data exists
        // Dispatch to update state
        // Do another http request to ask for more data
    // Downside: Speed constrained to speed of network
  }

  handleSubmit(e) {
    e.preventDefault();
    const labelData = JSON.parse(this.refs.label.value);
    const seriesData = JSON.parse(this.refs.series.value);
    this.dispatch(updateFromInput(labelData, seriesData));
  }

  render() {
    const simpleLineChartData = {
      labels: this.props.state.charts.labels,
      series: [this.props.state.charts.series],
    };
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
};

export default LiveResults;
