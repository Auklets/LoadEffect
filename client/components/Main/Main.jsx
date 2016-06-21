import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Main = () => (
  <Jumbotron>
    <h1>MAIN PAGE</h1>
    <p>
      This is going to be the main page, the protected route that the user should be able to get to
      after successfully logging in.
    </p>
  </Jumbotron>
);

export default Main;
