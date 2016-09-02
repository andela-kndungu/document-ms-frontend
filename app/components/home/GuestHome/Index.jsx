import React from 'react';
import { List } from 'immutable';
import AppBar from './AppBar.jsx';
import Dialog from '../../../redux/containers/dialogs/LogIn.js';
import Body from './Body/Index.jsx';
import { fetchPublicDocuments } from '../../../redux/actions';
import store from '../../../redux/store';
import socket from '../../../socket';

// When this client receives the fetch documents event from the server
socket.on('fetchDocuments', () => {
  // Fetch all public  document
  fetchPublicDocuments((action) => {
    // Send action to update store after document receipt
    store.dispatch(action);
  });
});

class GuestAppBar extends React.Component {
  // After the component has been loaded
  componentDidMount() {
    // Fetch all public  document
    fetchPublicDocuments((action) => {
      // Send action to update store after document receipt
      store.dispatch(action);
    });
  }

  render() {
    return (
      <div>
        <AppBar />
        <Dialog />
        <Body documents={this.props.publicDocuments} />
      </div>
    );
  }
}

GuestAppBar.propTypes = {
  publicDocuments: React.PropTypes.instanceOf(List),
};

export default GuestAppBar;

