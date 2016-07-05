import React from 'react';
import { connect } from 'react-redux';
import Main from './Main.jsx';
import { history } from '../../redux/store';
import { closeVerifyModal, openVerifyModal } from '../../redux/actionCreators/modal-actions';
import { changeCurrentScenarioId, checkForValidUrl } from '../../redux/actionCreators/scenario-actions';

export const MainContainer = (props) => (
  <div>
    <Main {...props} />
  </div>
);

const mapStateToProps = state => {
  const { scenario, auth } = state;
  const { allScenarios } = scenario;
  const { siteToken, isAuthenticated } = auth;

  return {
    allScenarios,
    siteToken,
    isAuthenticated,
    state,
  };
};

const mapDispatchToProps = dispatch => ({
  hideVerifyModal() {
    dispatch(closeVerifyModal());
  },

  showVerifyModal() {
    dispatch(openVerifyModal());
  },

  showResultsPage(id) {
    dispatch(changeCurrentScenarioId(id));
    history.push('/results');
  },

  validateUrl(url, scenarioID) {
    dispatch(checkForValidUrl(url, scenarioID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
