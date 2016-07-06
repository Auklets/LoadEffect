import React from 'react';
import { connect } from 'react-redux';
import { closeVerifyModal } from '../../redux/actionCreators/modal-actions';

import VerifySiteModal from './VerifySiteModal.jsx';

export const VerifySiteContainer = props => (
  <div>
    <VerifySiteModal {...props} />
  </div>
);

const mapStateToProps = state => {
  const { auth, modal } = state;
  const { siteToken } = auth;
  const { isVerifyModalOpen } = modal;

  return {
    isVerifyModalOpen,
    siteToken,
  };
};

const mapDispatchToProps = dispatch => ({
  hideVerifyModal() {
    dispatch(closeVerifyModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifySiteContainer);

