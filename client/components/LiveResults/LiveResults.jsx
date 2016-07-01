import React, { Component, PropTypes } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Panel } from 'react-bootstrap';
import { panelBackgroundColor } from './LiveResultsCSS.jsx';
import { calculateAverage, percentCompletion } from './LiveResultsHelpers.jsx';
import TestSummary from './ChartComponents/TestSummary.jsx';
import GeneralStatistics from './ChartComponents/GeneralStatistics.jsx';
import ActionsTable from './ChartComponents/ActionsTable.jsx';

class LiveResults extends Component {
  constructor(props) {
    super(props);

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

    // Set up socket listeners here

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
          <TestSummary
            currentScenarioName={this.props.currentScenarioName}
            currentWorkers={this.props.currentWorkers}
            currentSpawnsCount={this.props.currentSpawnsCount}
            currentTargetURL={this.props.currentTargetURL}
          />
        </Row>
        <Row className="show-grid">
          <GeneralStatistics
            averageElapsedTime={averageElapsedTime}
            numberActions={numberActions}
            currentSpawns={currentSpawns}
            percentComplete={percentComplete}
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
  labels: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  updateData: PropTypes.func.isRequired,
  updateLineChartData: PropTypes.func.isRequired,
  allScenarios: PropTypes.array.isRequired,
  currentSpawnsCount: PropTypes.number.isRequired,
  currentScenarioID: PropTypes.number.isRequired,
  currentScenarioName: PropTypes.string.isRequired,
  currentWorkers: PropTypes.number.isRequired,
  currentTargetURL: PropTypes.string.isRequired,
  httpVerb: PropTypes.array.isRequired,
  elapsedTime: PropTypes.array.isRequired,
};

export default LiveResults;
