import React from 'react';
import { connect } from 'react-redux';
import { updateFromInput, updateLineChartData } from '../../redux/actionCreators/results-actions';
import Results from './Results.jsx';

export const ResultsContainer = (props) => (
  <Results {...props} />
);

const mapStateToProps = (state) => {
  const { charts, scenario } = state;
  const { allScenarios, currentScenarioID, currentSpawnsCount, currentTargetURL, currentWorkers, currentScenarioName } = scenario;

  return {
    state,
    charts,
    allScenarios,
    currentScenarioID,
    currentSpawnsCount,
    currentTargetURL,
    currentWorkers,
    currentScenarioName,
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

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);
