import React from 'react';
import { connect } from 'react-redux';
import Home from './Home.jsx';

const HomeContainer = (props) => (
  <Home {...props} />
);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(HomeContainer);
