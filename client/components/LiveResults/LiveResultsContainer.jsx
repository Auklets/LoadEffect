import React from 'react';
import { connect } from 'react-redux';
import { updateFromInput } from '../../redux/actionCreators/liveResults-actions';
import LiveResults from './LiveResults.jsx';

const LiveResultsContainer = (props) => (
  <LiveResults {...props} />
);

const mapStateToProps = (state) => ({
  state,
  labels: state.charts.labels,
  series: state.charts.series,
});

const mapDispatchToProps = dispatch => ({
  updateData(labelData, seriesData) {
    dispatch(updateFromInput(labelData, seriesData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveResultsContainer);
