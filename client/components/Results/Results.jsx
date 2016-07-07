import React, { PropTypes } from 'react';
import { Grid, Row, Panel, ProgressBar, Modal } from 'react-bootstrap';
import { panelBackgroundColor, progressBarHeight } from './ResultsCSS.jsx';
import TestSummary from './ChartComponents/TestSummary.jsx';
import GeneralStatistics from './ChartComponents/GeneralStatistics.jsx';
import ActionsTable from './ChartComponents/ActionsTable.jsx';
import LineGraph from './ChartComponents/LineGraph.jsx';
import DetailedGraphs from './ChartComponents/DetailedGraphs.jsx';

const Results = props => {
  const { scenario, charts, updateLineChartData } = props;
  const { currentSpawnsCount, currentScenarioID, currentScenarioName, currentTargetURL, currentWorkers } = scenario;
  const { elapsedTimeSpawn, elapsedTimeAction, httpVerb, index, statusCode, averageElapsedTime, numberActions, currentSpawns, percentComplete, numberErrors, actionTaken, path } = charts;
  const totalSpawns = currentSpawnsCount;
  const loaderToggle = elapsedTimeAction.length;
  updateLineChartData(totalSpawns, currentScenarioID);

  // const testScenarioID = 15;
  // updateLineChartData(totalSpawns, testScenarioID);
  // const loaderToggle = true; // USE FOR TESTING

  return (
    <div className="container">
      <Grid>
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
          <LineGraph labels={charts.spawnLabel} series={elapsedTimeSpawn} />
        </Row>
        <Row className="show-grid">
          <DetailedGraphs
            elapsedTimeAction={elapsedTimeAction}
            actionTaken={actionTaken}
            path={path}
          />
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
      <Modal show={!loaderToggle}>
        <Modal.Header>
          <Modal.Title>We are spinning up our robots!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your test results are coming soon
        </Modal.Body>
      </Modal>
    </div>
  );
};

Results.propTypes = {
  updateData: PropTypes.func.isRequired,
  updateLineChartData: PropTypes.func.isRequired,
  allScenarios: PropTypes.array.isRequired,
  scenario: PropTypes.object.isRequired,
  charts: PropTypes.object.isRequired,
};

export default Results;
