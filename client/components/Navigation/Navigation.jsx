// React/Redux/Router/Bootstrap
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

// Modal/Popup Components
import LoginContainer from '../Login/LoginContainer.jsx';
import SignupContainer from '../Signup/SignupContainer.jsx';

const Navigation = props => {
  const { showLogin, showSignup, handleClick, isAuthenticated } = props;

  const LoggedIn = (
    <Nav pullRight>
      <li>
        <Link to="/new-scenario">Create New Scenario</Link>
      </li>
      <li>
        <Link to="/main">Main</Link>
      </li>
      <li>
        <Link onClick={handleClick} to="/">Logout</Link>
      </li>
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
      <LoginContainer />
      <SignupContainer />
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

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showLogin: PropTypes.func,
  showSignup: PropTypes.func,
  showNewScenario: PropTypes.func,
  handleClick: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navigation;
