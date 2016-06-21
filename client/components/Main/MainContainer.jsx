import React from 'react';
import { connect } from 'react-redux';
import Main from './Main.jsx';

const MainContainer = (props) => (
  <Main {...props} />
);

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(MainContainer);
