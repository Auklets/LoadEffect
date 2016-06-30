// React/Redux/Router/Bootstrap
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

// Dispatched actions
import { openLoginModal } from '../../redux/actionCreators/login-actions';
import { openSignupModal } from '../../redux/actionCreators/signup-actions';
import { openScenarioModal } from '../../redux/actionCreators/scenario-actions';
import { logoutUser } from '../../redux/actionCreators/logout-actions';

// Modal/Popup Components
import LoginModal from '../Login/LoginModal.jsx';
import SignupModal from '../Signup/SignupModal.jsx';
import NewScenarioModal from '../NewScenario/NewScenarioModal.jsx';

const NavigationContainer = (props) => {
  const { showLogin, showSignup, showNewScenario, handleClick, isAuthenticated } = props;

  const LoggedIn = (
    <Nav pullRight>
      <li>
        <Link to="/" onClick={showNewScenario}>Create New Scenario</Link>
      </li>
      <li>
        <Link to="/main">Main</Link>
      </li>
      <li>
        <Link onClick={handleClick} to="/">Logout</Link>
      </li>
      <NewScenarioModal />
    </Nav>
  );

  const NotLoggedIn = (
    <Nav pullRight>
      <li>
        <Link to="/" onClick={showLogin}>Login</Link>
      </li>
      <li>
        <Link to="/" onClick={showSignup}>Signup</Link>
      </li>
      <LoginModal />
      <SignupModal />
    </Nav>
  );

  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">LoadEffect</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {isAuthenticated ? LoggedIn : NotLoggedIn}
      </Navbar.Collapse>
    </Navbar>
  );
};

NavigationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showLogin: PropTypes.func,
  showSignup: PropTypes.func,
  showNewScenario: PropTypes.func,
  handleClick: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isLoginOpen: state.isLoginOpen,
    isSignupOpen: state.isSignupOpen,
    isScenarioOpen: state.isScenarioOpen,
    isAuthenticated,
    errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => ({
  showLogin() {
    dispatch(openLoginModal());
  },

  showSignup() {
    dispatch(openSignupModal());
  },

  showNewScenario() {
    dispatch(openScenarioModal());
  },

  handleClick() {
    dispatch(logoutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
