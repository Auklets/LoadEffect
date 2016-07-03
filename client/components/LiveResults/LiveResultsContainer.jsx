import React from 'react';
import { connect } from 'react-redux';
import { updateFromInput, updateLineChartData } from '../../redux/actionCreators/liveResults-actions';
import LiveResults from './LiveResults.jsx';
import { calculateAverage, percentCompletion } from './LiveResultsHelpers.jsx';

export const LiveResultsContainer = (props) => (
  <LiveResults {...props} />
);

const mapStateToProps = (state) => {
  const { charts, scenario } = state;
  const { allScenarios, currentScenarioID, currentSpawnsCount, currentTargetURL, currentWorkers, currentScenarioName } = scenario;
  const { labels, elapsedTime, httpVerb } = charts;

  const calculated = {
    averageElapsedTime: Math.round(calculateAverage(elapsedTime) * 100) / 100,
    numberActions: httpVerb.length,
    currentSpawns: labels.length,
    percentComplete: percentCompletion(currentSpawnsCount, labels.length),
    numberErrors: 0, // TODO with httpVerb arrays
  };

  return {
    state,
    charts,
    allScenarios,
    currentScenarioID,
    currentSpawnsCount,
    currentTargetURL,
    currentWorkers,
    currentScenarioName,
    calculated,
  };
};

const mapDispatchToProps = dispatch => ({
  updateData(labelData, seriesData) {
    dispatch(updateFromInput(labelData, seriesData));
  },

  updateLineChartData(totalJobs, currentScenarioID) {
    dispatch(updateLineChartData(totalJobs, currentScenarioID));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(LiveResultsContainer);
