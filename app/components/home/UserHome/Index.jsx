import React from 'react';
import AppBar from '../../../redux/containers/dialogs/UserAppBar.js';
import Body from './body/index.jsx';

const UserHome = () => {
  return (
    <div>
      <AppBar />
      <Body />
    </div>
  );
};

export default UserHome;

