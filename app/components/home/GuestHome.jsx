import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LogInIcon from 'material-ui/svg-icons/action/input';
import Dialog from 'material-ui/Dialog';
import LogInTabs from '../authentication/Tabs.jsx';

import { List } from 'immutable';
import Card from '../cards/Test.jsx';
import Add from '../documents/Add.jsx';
import store from '../../redux/store';
import socket from '../../socket';

import { fetchPublicDocuments } from '../../redux/actions';

socket.on('newDocument', () => {
  fetchPublicDocuments({}, (action) => {
    store.dispatch(action);
  });
});

class GuestAppBar extends React.Component {
  constructor() {
    super();

    this.state = {
      logInOpen: false,
      addDocumentOpen: false
    };

    this.openLogIn = this.openLogIn.bind(this);
    this.closeLogIn = this.closeLogIn.bind(this);
    this.openAddDocument = this.openAddDocument.bind(this);
    this.closeAddDocument = this.closeAddDocument.bind(this);
  }

  componentDidMount() {
    fetchPublicDocuments({}, (action) => {
      store.dispatch(action);
    });
  }

  openLogIn() {
    this.setState({ logInOpen: true });
  }

  openAddDocument() {
    this.setState({ addDocumentOpen: true });
  }

  closeLogIn() {
    this.setState({ logInOpen: false });
  }

  closeAddDocument() {
    this.setState({ addDocumentOpen: false });
  }

  render() {
    const logInDialogActions = [
      <FlatButton
        label="CANCEL"
        primary
        onTouchTap={this.closeLogIn}
      />,
    ];

    const addDocumentDialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.closeAddDocument}
      />,
    ];

    const nodes = this.props.documents.toJS().map((document) => {
      return (
        <Card
          owner={document.owner}
          title={document.title}
          content={document.content}
          date={document.createdAt}
          key={document.createdAt}
          disableEdit
        />
      );
    });
    return (
      <div>
        <AppBar
          style={{ position: 'fixed' }}
          title="ennovate"
          iconElementLeft={<span></span>}
          iconElementRight={
            <FlatButton
              label="LOGIN"
              icon={<LogInIcon />}
              onTouchTap={this.openLogIn}
            />
          }
          style={{ position: 'fixed' }}
        />
        <Dialog
          title={<LogInTabs />}
          actions={logInDialogActions}
          modal={false}
          open={this.state.logInOpen}
          onRequestClose={this.closeLogIn}
        />
        <Dialog
          title={<Add />}
          actions={addDocumentDialogActions}
          modal={false}
          open={this.state.addDocumentOpen}
          onRequestClose={this.closeDocument}
        />
        <div style={{ paddingTop: '64px', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', flexDirection: 'row' }}>
          {nodes}
        </div>
      </div>
    );
  }
}

GuestAppBar.propTypes = {
  documents: React.PropTypes.instanceOf(List)
};

export default GuestAppBar;

