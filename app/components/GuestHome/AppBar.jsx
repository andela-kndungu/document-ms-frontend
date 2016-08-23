import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LogInIcon from 'material-ui/svg-icons/action/input';

const openLogIn = () => {
  console.log('afc');
};

const MyAppBar = () => {
  return (
    <AppBar
      style={{ position: 'fixed' }}
      title="ennovate"
      iconElementLeft={<span />}
      iconElementRight={
        <FlatButton
          label="LOGIN"
          icon={<LogInIcon />}
          onTouchTap={openLogIn}
        />
        }
    />);
};

export default MyAppBar;

