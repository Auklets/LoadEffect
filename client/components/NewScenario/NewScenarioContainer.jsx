import React from 'react';
import { connect } from 'react-redux';
import { createScenario, checkValidScript, resetAttempt } from '../../redux/actionCreators/scenario-actions';
import { closeScenarioModal, openScenarioModal } from '../../redux/actionCreators/modal-actions';

import { history } from '../../redux/store';

import NewScenario from './NewScenario.jsx';
import NewScenarioSuccessModal from './NewScenarioSuccessModal.jsx';

export const NewScenarioContainer = props => (
  <div>
    <NewScenario {...props} />
    <NewScenarioSuccessModal {...props} />
  </div>
);

const mapStateToProps = state => {
  const { auth, modal, scenario } = state;
  const { isAuthenticated, errorMessage } = auth;
  const { isScenarioModalOpen } = modal;
  const { isValidScript, allScenarios, attemptedCheck } = scenario;

  return {
    isScenarioModalOpen,
    isAuthenticated,
    errorMessage,
    isValidScript,
    allScenarios,
    attemptedCheck,
    state,
  };
};

const mapDispatchToProps = dispatch => ({
  hideScenarioSuccessModal() {
    dispatch(closeScenarioModal());
  },

  showScenarioSuccessModal() {
    dispatch(openScenarioModal());
  },

  sendScenario(creds) {
    dispatch(createScenario(creds));
  },

  validateScript(script) {
    dispatch(checkValidScript(script));
  },

  resetValidation() {
    dispatch(resetAttempt());
  },

  routeToLiveResults() {
    history.push('/live-results');
    dispatch(closeScenarioModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewScenarioContainer);

