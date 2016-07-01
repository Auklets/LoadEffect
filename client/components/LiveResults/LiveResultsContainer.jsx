import React from 'react';
import { connect } from 'react-redux';
import { updateFromInput, updateLineChartData } from '../../redux/actionCreators/liveResults-actions';
import LiveResults from './LiveResults.jsx';

export const LiveResultsContainer = (props) => (
  <LiveResults {...props} />
);

const mapStateToProps = (state) => {
  const { charts, scenario } = state;
  const { allScenarios, currentScenarioID, currentSpawnsCount, currentTargetURL, currentWorkers, currentScenarioName } = scenario;
  const { labels, series, elapsedTime, httpVerb, index, statusCode } = charts;

  return {
    state,
    labels,
    series,
    allScenarios,
    currentScenarioID,
    currentSpawnsCount,
    currentTargetURL,
    currentWorkers,
    currentScenarioName,
    elapsedTime,
    httpVerb,
    index,
    statusCode,
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
