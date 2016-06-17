import React from 'react';
import Signup from './Signup.jsx';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

const SignupContainer = () => (
  <Signup />
);

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  // Fake funciton for now
  updateData() {
    dispatch(actions.updateData());
  },
});

SignupContainer.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);

