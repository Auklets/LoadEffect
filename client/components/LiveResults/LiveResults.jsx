import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import { updateFromInput } from '../../redux/actionCreators/liveResults-actions';
import { Form, Button } from 'react-bootstrap';

class LiveResults extends Component {
  constructor(props) {
    super(props);
    this.labels = this.props.labels;
    this.series = this.props.series;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const labelData = this.refs.labels;
    const seriesData = this.refs.labels;
    this.props.dispatch(updateFromInput(labelData, seriesData));
  }

  render() {
    const simpleLineChartData = {
      labels: this.labels,
      series: [this.series],
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
            <p>Labels</p>
            <input
              ref="label"
              type="text"
              placeholder="Enter an array of data"
            />
          </div>
          <div>
            <p>Series</p>
            <input
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
};

export default LiveResults;
