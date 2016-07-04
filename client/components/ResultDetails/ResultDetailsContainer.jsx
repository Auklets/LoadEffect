import React from 'react';
import { connect } from 'react-redux';

import ResultDetails from './ResultDetails.jsx';

export const ResultDetailsContainer = (props) => (
  <ResultDetails {...props} />
);

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultDetailsContainer);
