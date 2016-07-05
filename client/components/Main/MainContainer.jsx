import React from 'react';
import { connect } from 'react-redux';
import Main from './Main.jsx';
import { history } from '../../redux/store';
import { runScenario, changeCurrentScenarioId, checkForValidUrl, rerunScenario } from '../../redux/actionCreators/scenario-actions';

export const MainContainer = (props) => (
  <div>
    <Main {...props} />
  </div>
);

const mapStateToProps = state => {
  const { scenario, auth } = state;
  const { allScenarios } = scenario;

  return {
    allScenarios,
    state,
  };
};

const mapDispatchToProps = dispatch => ({
  showResultsPage(id) {
    dispatch(changeCurrentScenarioId(id));
    history.push('/results');
  },

  validateUrl(url, scenarioID) {
    dispatch(checkForValidUrl(url, scenarioID));
  },

  runVerifiedScenario(creds) {
    dispatch(runScenario(creds));
    history.push('/results');
  },

  rerunScenarioTest(creds) {
    dispatch(rerunScenario(creds));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
