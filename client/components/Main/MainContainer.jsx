import React from 'react';
import { connect } from 'react-redux';
import Main from './Main.jsx';

const MainContainer = (props) => (
  <Main {...props} />
);

const mapStateToProps = (state) => ({
  state,
  scenarios: state.allScenario.allScenarios,
});

export default connect(mapStateToProps)(MainContainer);
