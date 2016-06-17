import React from 'react';
import Navigation from './Navigation/Navigation.jsx';

const App = (props) => (
  <div>
    <Navigation />
    <main>
      {props.children}
    </main>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
