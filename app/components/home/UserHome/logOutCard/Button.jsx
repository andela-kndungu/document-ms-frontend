import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import constants from '../../../../redux/constants';
import store from '../../../../redux/store';

const button = {
  textAlign: 'right',
  marginTop: '10px'
};

const handleLogOut = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
  }

  store.dispatch({
    type: constants.LOG_OUT_USER
  });
};

const LogOutButton = () => {
  return (
    <div style={button}>
      <FlatButton
        label="LOG OUT"
        primary
        onClick={handleLogOut}
      />
    </div>
  );
};

export default LogOutButton;

