import React from 'react';
import { connect } from 'react-redux';
import Main from './Main.jsx';

export const MainContainer = (props) => (
  <Main {...props} />
);

const mapStateToProps = state => {
  const { scenario } = state;
  const { allScenarios } = scenario;

  return {
    allScenarios,
    state,
  };
};

export default connect(mapStateToProps)(MainContainer);
