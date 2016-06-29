import React from 'react';
import { connect } from 'react-redux';
import LiveResults from './LiveResults.jsx';

const LiveResultsContainer = (props) => (
  <LiveResults {...props} />
);

const mapStateToProps = (state) => ({
  state,
  labels: state.charts.labels,
  series: state.charts.series,
});

export default connect(mapStateToProps)(LiveResultsContainer);
