// React/Redux/Router/Bootstrap
import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../redux/store';

// Dispatched actions
import { closeScenarioModal } from '../../redux/actionCreators/modal-actions';

import ScenarioModal from './ScenarioModal.jsx';

export const ScenarioModalContainer = (props) => (
  <ScenarioModal {...props} />
);

const mapStateToProps = (state) => {
  const { auth, modal, scenario } = state;
  const { siteToken } = auth;
  const { isScenarioModalOpen } = modal;
  const { isVerifiedOwner } = scenario;

  return {
    siteToken,
    isScenarioModalOpen,
    isVerifiedOwner,
  };
};

const mapDispatchToProps = (dispatch) => ({
  hideScenarioSuccessModal() {
    dispatch(closeScenarioModal());
  },

  routeToMain() {
    history.push('/main');
    dispatch(closeScenarioModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScenarioModalContainer);
