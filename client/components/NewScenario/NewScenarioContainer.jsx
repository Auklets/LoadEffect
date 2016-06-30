import React from 'react';
import { connect } from 'react-redux';
import { createScenario, closeScenarioModal } from '../../redux/actionCreators/scenario-actions';

import NewScenario from './NewScenario.jsx';

const NewScenarioContainer = props => (
  <NewScenario {...props} />
);

const mapStateToProps = state => {
  const { auth, modal } = state;
  const { isAuthenticated, errorMessage } = auth;
  const { isScenarioOpen } = modal;

  return {
    isScenarioOpen,
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  hideScenario() {
    dispatch(closeScenarioModal());
  },

  sendScenario(creds) {
    dispatch(createScenario(creds));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewScenarioContainer);

