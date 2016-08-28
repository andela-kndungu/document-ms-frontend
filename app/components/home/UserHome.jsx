import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import HomeIcon from 'material-ui/svg-icons/action/home';
import { Map, List } from 'immutable';

import SearchBar from '../SearchBar/index.jsx';
import LogOutCard from '../authentication/logOut/LogOutCard.jsx';
import Card from '../cards/Test.jsx';
import Add from '../documents/Add.jsx';
import { fetchDocuments, fetchCategories } from '../../redux/actions';
import store from '../../redux/store';

const fabStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  zIndex: '1'
};
import socket from '../../socket';

socket.on('newDocument', () => {
  fetchDocuments({}, (action) => {
    store.dispatch(action);
  });
});

class UserHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logOutOpen: false,
      addDocumentOpen: false
    };

    this.openLogOut = this.openLogOut.bind(this);
    this.closeLogOut = this.closeLogOut.bind(this);
  }

  componentDidMount() {
    fetchDocuments({}, (action) => {
      store.dispatch(action);
    });

    fetchCategories((action) => {
      store.dispatch(action);
    });
  }

  openLogOut(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      logOutOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  closeLogOut() {
    this.setState({
      logOutOpen: false,
    });
  }

  filterDocuments(searchTerm, documents) {
    return documents.filter((document) => {
      if (searchTerm === '') {
        return true;
      }

      const inTitle = document.title.toLowerCase().indexOf(searchTerm);
      const inContent = document.content.toLowerCase().indexOf(searchTerm);

      return inTitle > -1 || inContent > -1;
    });
  }

  render() {
    const searchTerm = this.props.searchTerm;
    const documents = this.props.documents.toJS();
    const filteredDocuments = this.filterDocuments(searchTerm, documents);
    const nodes = filteredDocuments.map((document, index) => {
      const canDelete = document.owner.username === this.props.userDetails.get('username');
      const isPublic = document.accessibleBy.indexOf('user') > -1;
      return (
        <Card
          key={index}
          owner={document.owner}
          title={document.title}
          content={document.content}
          date={document.createdAt}
          category={document.category}
          documentId={document._id}
          canDelete={canDelete}
          isPublic={isPublic}
        />
      );
    });
    return (
      <div>
        <AppBar
          style={{ position: 'fixed' }}
          iconElementLeft={
            <FlatButton
              style={{ marginTop: '9px', color: 'white' }}
              labelStyle={{ textTransform: 'lowercase' }}
              icon={<HomeIcon />}
              label="ennovate"
              onTouchTap={() => {
                fetchDocuments({}, (action) => {
                  store.dispatch(action);
                });
              }}
            />
          }
          onLeftIconButtonTouchTap={this.toggleDrawer}
          title={<SearchBar />}
          iconElementRight={
            <FlatButton
              label={this.props.userDetails.get('username')}
              onTouchTap={this.openLogOut}
            />
          }
        />
        <Popover
          open={this.state.logOutOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.closeLogOut}
        >
          <LogOutCard userDetails={this.props.userDetails} />
        </Popover>
        <div style={{ paddingTop: '64px', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', flexDirection: 'row' }}>
          {nodes}
        <FloatingActionButton
          onTouchTap={() => {
            store.dispatch({ type: 'TOGGLE_ADD_DOCUMENT' });
          }}
          style={fabStyle}
          secondary
        >
          <ContentAdd />
        </FloatingActionButton>
        </div>
        <Dialog
          title={<Add />}
          actions={[
            <FlatButton
              label="CANCEL"
              primary
              onTouchTap={() => {
                store.dispatch({ type: 'TOGGLE_ADD_DOCUMENT' });
              }}
            />
          ]}
          modal={false}
          open={this.props.addDocumentOpen}
          onRequestClose={() => {
            store.dispatch({ type: 'TOGGLE_ADD_DOCUMENT' });
          }}
        />
      </div>
    );
  }
}

UserHome.propTypes = {
  userDetails: React.PropTypes.instanceOf(Map),
  documents: React.PropTypes.instanceOf(List),
  searchTerm: React.PropTypes.string,
  addDocumentOpen: React.PropTypes.bool,
  history: React.PropTypes.object
};

export default UserHome;

