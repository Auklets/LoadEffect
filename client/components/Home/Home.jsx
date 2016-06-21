import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Home = () => (
  <Jumbotron>
    <h1>Load Testing Info2</h1>
    <p>
    This is going to be our main info Jumbotron. All visitors will hit this page first.
    We can figure out the exact design later if we want.
    </p>
    <p>
      <Button bsStyle="info">Learn more</Button>
    </p>
  </Jumbotron>
);

export default Home;
