import React from 'react';
import { Map } from 'immutable';

import Avatar from './Avatar.jsx';
import Info from './Info.jsx';
import Divider from './Divider.jsx';
import Button from './Button.jsx';

const container = {
  height: '140px',
  width: '300px',
  margin: '10px',
};

const LogOutCard = (props) => {
  const first = props.userDetails.getIn(['name', 'first']);
  const last = props.userDetails.getIn(['name', 'last']);
  return (
    <div style={container}>
      <div>
        <Avatar photo={props.userDetails.get('photo')} />
        <Info
          name={{ first, last }}
          email={props.userDetails.get('email')}
        />
      </div>
      <Divider />
      <Button />
    </div>
  );
};

LogOutCard.propTypes = {
  userDetails: React.PropTypes.instanceOf(Map)
};

export default LogOutCard;

