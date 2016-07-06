import React, { Component, PropTypes } from 'react';
import { Grid, Row, Panel, ProgressBar } from 'react-bootstrap';
import { panelBackgroundColor, progressBarHeight } from './ResultsCSS.jsx';
import TestSummary from './ChartComponents/TestSummary.jsx';
import GeneralStatistics from './ChartComponents/GeneralStatistics.jsx';
import ActionsTable from './ChartComponents/ActionsTable.jsx';
import LineGraph from './ChartComponents/LineGraph.jsx';

class Results extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    const totalSpawns = props.scenario.currentSpawnsCount;
    const currentScenarioID = props.scenario.currentScenarioID;

    this.props.updateLineChartData(totalSpawns, currentScenarioID);
  }

  // REMOVE CLICK HANDLER FOR PRODUCTION
  handleClick(e) {
    e.preventDefault();
    const { updateLineChartData } = this.props;
    const { currentSpawnsCount } = this.props.scenario;
    // REMOVE FOR PRODUCTIONs
    const testScenarioID = 15;
    updateLineChartData(currentSpawnsCount, testScenarioID);
  }

  render() {
    const { scenario, charts } = this.props;
    const { currentSpawnsCount, currentScenarioName, currentTargetURL, currentWorkers } = scenario;
    const { elapsedTimeSpawn, elapsedTimeAction, httpVerb, index, statusCode, averageElapsedTime, numberActions, currentSpawns, percentComplete, numberErrors, actionTaken, path } = charts;

    const simpleLineChartData = {
      labels: charts.spawnLabel,
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
            currentScenarioName={currentScenarioName}
            currentWorkers={currentWorkers}
            currentSpawnsCount={currentSpawnsCount}
            currentTargetURL={currentTargetURL}
          />
        </Row>
        <Row className="show-grid">
          <Panel bsStyle="primary" style={panelBackgroundColor} header={'Test Percent Completion'}>
            <ProgressBar bStyle="success" now={percentComplete} label={`${percentComplete}%`} style={progressBarHeight} />
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
            actionTaken={actionTaken}
            path={path}
          />
        </Row>
      </Grid>
    );
  }
}

Results.propTypes = {
  updateData: PropTypes.func.isRequired,
  updateLineChartData: PropTypes.func.isRequired,
  allScenarios: PropTypes.array.isRequired,
  scenario: PropTypes.object.isRequired,
  charts: PropTypes.object.isRequired,
};

export default Results;
