import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LogInIcon from 'material-ui/svg-icons/action/input';

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
        />
        }
    />);
};

export default MyAppBar;

