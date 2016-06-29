import React from 'react';
import { connect } from 'react-redux';
import LiveResults from './LiveResults.jsx';

const LiveResultsContainer = (props) => (
  <LiveResults {...props} />
);

const mapStateToProps = (state) => ({
  state,
  // Fix this
});

export default connect(mapStateToProps)(LiveResultsContainer);
