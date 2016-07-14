import React from 'react';
import { connect } from 'react-redux';
import { closeDemoModal } from '../../redux/actionCreators/modal-actions';

import DemoOnlyModal from './DemoOnlyModal.jsx';

export const DemoOnlyContainer = props => (
  <DemoOnlyModal className="demo-modal" {...props} />
);

const mapStateToProps = state => {
  const { auth, modal } = state;
  const { siteToken } = auth;
  const { isDemoModalOpen } = modal;

  return {
    isDemoModalOpen,
    siteToken,
  };
};

const mapDispatchToProps = dispatch => ({
  hideDemoModal() {
    dispatch(closeDemoModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoOnlyContainer);

