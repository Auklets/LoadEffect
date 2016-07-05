// React/Redux/Router/Bootstrap
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

// Modal/Popup Components
import VerifySiteContainer from '../VerifySite/VerifySiteContainer.jsx';
import ScenarioModalContainer from '../Scenario/ScenarioModalContainer.jsx';

const Navigation = props => {
  const { handleClick, allScenarios, showVerifyModal } = props;

  const LoggedIn = (
    <Nav pullRight>
      <NavItem onClick={showVerifyModal} to="">Your Token</NavItem>
      <li>
        <Link to="/new-scenario">Create New Scenario</Link>
      </li>
      <li>
        <Link to="/main">Main</Link>
      </li>
      <li>
        <Link onClick={handleClick} to="/">Logout</Link>
      </li>
      <VerifySiteContainer allScenarios={allScenarios} />
      <ScenarioModalContainer />
    </Nav>
  );

  return (
    <Navbar fluid inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">LoadEffect</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {LoggedIn}
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  showVerifyModal: PropTypes.func,
  showNewScenario: PropTypes.func,
  handleClick: PropTypes.func,
  allScenarios: PropTypes.array,
};

export default Navigation;
