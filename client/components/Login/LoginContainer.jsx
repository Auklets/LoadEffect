import React from 'react';
import Login from './Login.jsx';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

const LoginContainer = () => (
  <Login />
);

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  // Fake function for now
  updateData() {
    dispatch(actions.updateData());
  },
});

LoginContainer.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

