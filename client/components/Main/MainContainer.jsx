import React from 'react';
import { connect } from 'react-redux';
import Main from './Main.jsx';
import { closeVerifyModal, openVerifyModal } from '../../redux/actionCreators/modal-actions';

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
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
