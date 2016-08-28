import React from 'react';
import AppBar from './AppBar.jsx';
import Dialog from '../../../redux/containers/dialogs/LogIn.js';

const GuestAppBar = () => {
  return (
    <div>
      <AppBar />
      <Dialog />
    </div>
  );
};

export default GuestAppBar;

