import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Navigation = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Load Tester</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1}><Link to="/login">Login</Link></NavItem>
        <NavItem eventKey={2}><Link to="/signup">Signup</Link></NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
