import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import LoginContainer from '../Login/LoginContainer.jsx';
import SignupContainer from '../Signup/SignupContainer.jsx';

import Jumbo from './Jumbo.jsx';
import Benefits from './Benefits.jsx';
import CarouselPictures from './CarouselPictures.jsx';
import Developers from './Developers.jsx';
import GetStarted from './GetStarted.jsx';
import Footer from './Footer.jsx';

const Home = props => (
  <div>
    <LoginContainer />
    <SignupContainer />
    <Jumbo />
    <Benefits />
    <CarouselPictures />
    <Developers />
    <GetStarted {...props} />
    <Footer />
  </div>
);


export default Home;
