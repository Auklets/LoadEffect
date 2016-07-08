import React from 'react';
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
    <Jumbo {...props} />
    <Benefits />
    <CarouselPictures />
    <Developers />
    <GetStarted {...props} />
    <Footer />

    <LoginContainer />
    <SignupContainer />
  </div>
);

export default Home;
