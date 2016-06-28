
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { logoutUser } from '../../redux/actionCreators/logout-actions';

const NavigationContainer = (props) => {
  const handleClick = function handleClick() {
    props.dispatch(logoutUser());
  };

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
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
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
        {props.isAuthenticated ? LoggedIn : NotLoggedIn}
      </Navbar.Collapse>
    </Navbar>
  );
};

NavigationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default NavigationContainer;
