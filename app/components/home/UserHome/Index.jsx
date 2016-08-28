import React from 'react';
import { List } from 'immutable';
import AppBar from '../../../redux/containers/dialogs/UserAppBar.js';
import Body from './body/index.jsx';

const UserHome = (props) => {
  return (
    <div>
      <AppBar />
      <Body documents={props.documents} />
    </div>
  );
};

UserHome.propTypes = {
  documents: React.PropTypes.instanceOf(List)
};
export default UserHome;

