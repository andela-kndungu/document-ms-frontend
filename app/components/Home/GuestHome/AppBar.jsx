import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LogInIcon from 'material-ui/svg-icons/action/input';
import { toggleLogInDialog } from '../../../redux/actions';
import store from '../../../redux/store';

// Called when log in button is clicked
const openLogIn = () => {
  // Calls callback with the genrated action, which is dispatched to store
  toggleLogInDialog((action) => {
    store.dispatch(action);
  });
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

