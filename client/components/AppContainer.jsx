import React from 'react';
import App from './App.jsx';
import { connect } from 'react-redux';

const AppContainer = (props) => (
  <App {...props} />
);

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(AppContainer);
