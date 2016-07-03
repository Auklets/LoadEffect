import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Panel, ProgressBar } from 'react-bootstrap';
import { panelBackgroundColor } from './LiveResultsCSS.jsx';
import TestSummary from './ChartComponents/TestSummary.jsx';
import GeneralStatistics from './ChartComponents/GeneralStatistics.jsx';
import ActionsTable from './ChartComponents/ActionsTable.jsx';

class LiveResults extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    // PRODUCTION: UNCOMMENT FOR PRODUCTION
    // this.props.updateLineChartData(props.currentSpawnsCount, props.currentScenarioID);
  }

  // REMOVE CLICK HANDLER FOR PRODUCTION
  handleClick(e) {
    e.preventDefault();
    const { currentSpawnsCount, calculated } = this.props;
    // REMOVE FOR PRODUCTION
    const testScenarioID = 15;
    this.props.updateLineChartData(currentSpawnsCount, testScenarioID, calculated);
    // this.props.updateLineChartData(this.props.currentSpawnsCount, this.props.currentScenarioID);
  }

  render() {
    const { currentSpawnsCount } = this.props;
    const { labels, series, elapsedTime, httpVerb, index, statusCode } = this.props.charts;
    const { averageElapsedTime, numberActions, currentSpawns, percentComplete, numberErrors } = this.props.calculated;

    /* ****** Chartist Configurations ****** */
    const simpleLineChartData = {
      labels,
      series: [series],
    };
    const lineChartOptions = {
      low: 0,
      showArea: true,
    };

    return (
      <Grid>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor}>
            <button onClick={this.handleClick}>Click to Test Fetching Data!</button>
          </Panel>
        </Row>
        <Row className="show-grid">
          <TestSummary
            currentScenarioName={this.props.currentScenarioName}
            currentWorkers={this.props.currentWorkers}
            currentSpawnsCount={currentSpawnsCount}
            currentTargetURL={this.props.currentTargetURL}
          />
        </Row>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor} header={'Test Percent Completion'}>
            <ProgressBar bStyle="success" now={percentComplete} label={`${percentComplete}%`} />
          </Panel>
        </Row>
        <Row className="show-grid">
          <GeneralStatistics
            averageElapsedTime={averageElapsedTime}
            numberActions={numberActions}
            currentSpawns={currentSpawns}
            numberErrors={numberErrors}
          />
        </Row>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor}>
            <div style={{ backgroundColor: 'white' }}>
              <ChartistGraph data={simpleLineChartData} options={lineChartOptions} type={'Line'} />
            </div>
          </Panel>
        </Row>
        <Row className="show-grid">
          <ActionsTable
            index={index}
            httpVerb={httpVerb}
            statusCode={statusCode}
            elapsedTime={elapsedTime}
          />
        </Row>
      </Grid>
    );
  }
}

LiveResults.propTypes = {
  state: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
  updateLineChartData: PropTypes.func.isRequired,
  allScenarios: PropTypes.array.isRequired,
  currentSpawnsCount: PropTypes.number.isRequired,
  currentScenarioID: PropTypes.number.isRequired,
  currentScenarioName: PropTypes.string.isRequired,
  currentWorkers: PropTypes.number.isRequired,
  currentTargetURL: PropTypes.string.isRequired,
  calculated: PropTypes.object.isRequired,
  charts: PropTypes.object.isRequired,
};

export default LiveResults;
