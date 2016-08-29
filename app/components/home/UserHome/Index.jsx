import React from 'react';
import AppBar from '../../../redux/containers/dialogs/UserAppBar.js';
import Body from '../../../redux/containers/UserHome/Body.js';
import { fetchDocuments } from '../../../redux/actions';
import store from '../../../redux/store';
import socket from '../../../socket';

// When this client receives the fetch documents event from the server
socket.on('fetchDocuments', () => {
  // Fetch documents from server to reflect the change
  const token = localStorage.getItem('token');
  fetchDocuments(token, {}, (action) => {
    store.dispatch(action);
  });
});

class UserHome extends React.Component {
  // After the component has been loaded
  componentDidMount() {
    // Get user token, they can only be here if they are authenticated
    const token = localStorage.getItem('token');

    // Fetch all the documents the user has access to
    // fetchDocuments(token, queryParameters, callbck)
    fetchDocuments(token, {}, (action) => {
      // Send action to update store after document receipt
      store.dispatch(action);
    });
  }

  render() {
    return (
      <div>
        <AppBar />
        <Body />
      </div>
    );
  }
}

export default UserHome;

