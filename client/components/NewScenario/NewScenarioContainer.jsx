import React from 'react';
import { connect } from 'react-redux';
import { createScenario, checkValidScript, resetAttempt } from '../../redux/actionCreators/scenario-actions';

import NewScenario from './NewScenario.jsx';

export const NewScenarioContainer = props => (
  <NewScenario {...props} />
);

const mapStateToProps = state => {
  const { auth, scenario } = state;
  const { errorMessage } = auth;
  const { isValidScript, attemptedCheck, scriptMessage } = scenario;

  return {
    errorMessage,
    scriptMessage,
    isValidScript,
    attemptedCheck,
  };
};

const mapDispatchToProps = dispatch => ({
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

