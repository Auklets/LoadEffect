import React from 'react';
import { Jumbotron, Button, Col } from 'react-bootstrap';

const Jumbo = props => (
  <Jumbotron id="jumbo-id" className="splash-jumbo">
    <div className="bg-image">
      <div className="container-fluid">
        <div className="text-center splash-text">
          <h1>Load Effect</h1>
          <p>
            Stress test your app today
          </p>
          <Col sm={12}>
            <div>
              {!props.isAuthenticated ? (
                <p>
                  <Button className="splash-jumbo-buttons" onClick={props.showLogin} bsSize="large" bsStyle="primary">
                    Login
                  </Button>
                  {' '}
                  <Button className="splash-jumbo-buttons" onClick={props.showSignup} bsSize="large" bsStyle="primary">
                    Sign Up
                  </Button>
                </p>
              ) : null}
            </div>
          </Col>
        </div>
      </div>
    </div>
  </Jumbotron>
);

export default Jumbo;
