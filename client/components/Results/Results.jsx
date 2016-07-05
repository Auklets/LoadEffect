import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import Chartist from 'chartist';
import { Grid, Row, Panel, ProgressBar } from 'react-bootstrap';
import { panelBackgroundColor } from './ResultsCSS.jsx';
import TestSummary from './ChartComponents/TestSummary.jsx';
import GeneralStatistics from './ChartComponents/GeneralStatistics.jsx';
import ActionsTable from './ChartComponents/ActionsTable.jsx';
import LineGraph from './ChartComponents/Linegraph.jsx';

class Results extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    const totalSpawns = props.currentSpawnsCount;
    const currentScenarioID = props.currentScenarioID;

    // console.log('This is props', props);

    // PRODUCTION: UNCOMMENT FOR PRODUCTION
    this.props.updateLineChartData(totalSpawns, currentScenarioID);
    // PRODUCTION: UNCOMMENT FOR PRODUCTION
    // TODO - Build so that the click would change the currentScenario ID
    // props.updateLineChartData(props.currentSpawnsCount, props.currentScenarioID, props.calculated);
  }

  // REMOVE CLICK HANDLER FOR PRODUCTION
  handleClick(e) {
    e.preventDefault();
    const { currentSpawnsCount, updateLineChartData } = this.props;
    // REMOVE FOR PRODUCTION
    const testScenarioID = 15;
    updateLineChartData(currentSpawnsCount, testScenarioID);
    // updateLineChartData(currentSpawnsCount, currentScenarioID);
  }

  render() {
    const { currentSpawnsCount, charts } = this.props;
    const { elapsedTimeSpawn, elapsedTimeAction, httpVerb, index, statusCode, averageElapsedTime, numberActions, currentSpawns, percentComplete, numberErrors } = charts;
    /* ****** Chartist Configurations ****** */
    const simpleLineChartData = {
      index: charts.spawnLabel,
      series: [elapsedTimeSpawn],
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
          <LineGraph simpleLineChartData={simpleLineChartData} />
        </Row>
        <Row className="show-grid">
          <ActionsTable
            index={index}
            httpVerb={httpVerb}
            statusCode={statusCode}
            elapsedTimeAction={elapsedTimeAction}
          />
        </Row>
      </Grid>
    );
  }
}

Results.propTypes = {
  state: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
  updateLineChartData: PropTypes.func.isRequired,
  allScenarios: PropTypes.array.isRequired,
  currentSpawnsCount: PropTypes.number.isRequired,
  currentScenarioID: PropTypes.number.isRequired,
  currentScenarioName: PropTypes.string.isRequired,
  currentWorkers: PropTypes.number.isRequired,
  currentTargetURL: PropTypes.string.isRequired,
  charts: PropTypes.object.isRequired,
};

export default Results;
