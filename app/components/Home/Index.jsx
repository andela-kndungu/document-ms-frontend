import React from 'react';
import { Map } from 'immutable';

import GuestHome from '../../redux/containers/GuestHome.js';
import UserHome from '../../redux/containers/UserHome/index.js';

const Home = (props) => {
  return (
    props.isAuthenticated
    ? <UserHome userDetails={props.userDetails} />
    : <GuestHome />
  );
};

Home.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  userDetails: React.PropTypes.instanceOf(Map)
};

export default Home;

