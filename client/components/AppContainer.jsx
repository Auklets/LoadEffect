import React, { PropTypes } from 'react';
import { getScenarios } from '../redux/actionCreators/scenario-actions';
import NavigationContainer from './Navigation/NavigationContainer.jsx';
import { connect } from 'react-redux';

export const AppContainer = (props) => {
  const { dispatch, isAuthenticated, errorMessage, getScenarioData } = props;

  // Makes a get request to retrieve scenarios data only if user is authenticated
  // This way, the MAIN page will already have the data to render
  if (isAuthenticated) {
    getScenarioData();
  }

  return (
    <div>
     {
      isAuthenticated ?
        <NavigationContainer
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        : null
     }
      <main>
        {props.children}
      </main>
    </div>
  );
};

AppContainer.propTypes = {
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
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  getScenarioData() {
    dispatch(getScenarios());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
