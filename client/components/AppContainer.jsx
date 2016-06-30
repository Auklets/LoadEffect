import React, { PropTypes } from 'react';
import { getScenarios } from '../redux/actionCreators/scenario-actions';
import Navigation from './Navigation/Navigation.jsx';
import { connect } from 'react-redux';

const App = (props) => {
  const { dispatch, isAuthenticated, errorMessage, getScenarioData } = props;

  // Makes a get request to retrieve scenarios data only if user is authenticated
  // This way, the MAIN page will already have the data to render
  if (isAuthenticated) {
    getScenarioData();
  }

  return (
    <div>
      <Navigation
        isAuthenticated={isAuthenticated}
        errorMessage={errorMessage}
        dispatch={dispatch}
      />
      <main>
        {props.children}
      </main>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object,
  dispatch: PropTypes.func,
  getScenarioData: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    data: state.data,
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  getScenarioData() {
    dispatch(getScenarios());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
