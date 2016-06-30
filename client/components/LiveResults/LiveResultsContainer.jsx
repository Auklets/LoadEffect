import React from 'react';
import { connect } from 'react-redux';
import { updateFromInput, updateLineChartData } from '../../redux/actionCreators/liveResults-actions';
import LiveResults from './LiveResults.jsx';

const LiveResultsContainer = (props) => (
  <LiveResults {...props} />
);

const mapStateToProps = (state) => {
  const { charts, scenario } = state;
  const { allScenarios, currentScenarioID } = scenario;
  const { labels, series } = charts;

  return {
    state,
    labels,
    series,
    allScenarios,
    currentScenarioID,
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
