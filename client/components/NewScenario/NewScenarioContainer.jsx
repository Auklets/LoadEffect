import React from 'react';
import { connect } from 'react-redux';
import { createScenario, closeScenarioModal, checkValidScript, resetAttempt } from '../../redux/actionCreators/scenario-actions';

import NewScenario from './NewScenario.jsx';

const NewScenarioContainer = props => (
  <NewScenario {...props} />
);

const mapStateToProps = state => {
  const { auth, modal, scenario } = state;
  const { isAuthenticated, errorMessage } = auth;
  const { isScenarioOpen } = modal;
  const { isValidScript, allScenarios, attemptedCheck } = scenario;

  return {
    isScenarioOpen,
    isAuthenticated,
    errorMessage,
    isValidScript,
    allScenarios,
    attemptedCheck,
    state,
  };
};

const mapDispatchToProps = dispatch => ({
  hideScenario() {
    dispatch(closeScenarioModal());
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NewScenarioContainer);

