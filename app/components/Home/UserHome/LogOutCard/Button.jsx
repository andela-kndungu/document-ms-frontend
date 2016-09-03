import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import constants from '../../../../redux/constants';
import store from '../../../../redux/store';

const button = {
  textAlign: 'right',
  marginTop: '10px'
};

const handleLogOut = () => {
  // When logging out first remove the token from local storage
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
  }

  // Then tell the store the user has logged out
  store.dispatch({
    type: constants.LOG_OUT_USER
  });
};

const LogOutButton = () => {
  return (
    <div style={button}>
      <FlatButton
        label="LOG OUT"
        secondary
        onClick={handleLogOut}
      />
    </div>
  );
};

export default LogOutButton;

