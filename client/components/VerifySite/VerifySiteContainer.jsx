import React from 'react';
import { connect } from 'react-redux';
import { closeVerifyModal, openVerifyModal } from '../../redux/actionCreators/modal-actions';
import { getScenarios } from '../../redux/actionCreators/scenario-actions';

import VerifySiteModal from './VerifySiteModal.jsx';

export const VerifySiteContainer = props => (
  <div>
    <VerifySiteModal {...props} />
  </div>
);

const mapStateToProps = state => {
  const { auth, modal } = state;
  const { errorMessage, siteToken } = auth;
  const { isVerifyModalOpen } = modal;

  return {
    isVerifyModalOpen,
    siteToken,
    errorMessage,
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

  getScenarioData() {
    dispatch(getScenarios());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifySiteContainer);

