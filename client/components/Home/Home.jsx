import React, { PropTypes } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Home = (props) => {
  const { showLogin, showSignup, isAuthenticated } = props;
  return (
    <div>
      <Jumbotron>
        <h1>LoadEffect</h1>
        <p>
        This is going to be our main info Jumbotron. All visitors will hit this page first.
        We can figure out the exact design later if we want.
        </p>
        {!isAuthenticated ? (
          <p>
            <Button onClick={showLogin} bsSize="large" bsStyle="info">
              Login
            </Button>
            <Button onClick={showSignup} bsSize="large" bsStyle="primary">
              Signup
            </Button>
          </p>
        ) : null}
      </Jumbotron>
    </div>
  );
};

Home.propTypes = {
  showLogin: PropTypes.func,
  showSignup: PropTypes.func,
};

export default Home;
