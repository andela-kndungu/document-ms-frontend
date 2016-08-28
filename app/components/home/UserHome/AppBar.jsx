import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import HomeIcon from 'material-ui/svg-icons/action/home';
import Popover from 'material-ui/Popover';
import { Map } from 'immutable';

import LogOutCard from './logOutCard/index.jsx';
import SearchBar from './SearchBar.jsx';
import { fetchDocuments, toggleLogOutDialog } from '../../../redux/actions';
import store from '../../../redux/store';

class UserAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.toggleLogOut = this.toggleLogOut.bind(this);
  }

  toggleLogOut(event) {
    // This prevents ghost click.
    if (event.preventDefault) {
      event.preventDefault();
    }

    toggleLogOutDialog((action) => {
      store.dispatch(action);
    });

    this.setState({
      anchorEl: event.currentTarget
    });
  }

  render() {
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
                fetchDocuments(localStorage.getItem('token'), {}, (action) => {
                  store.dispatch(action);
                });
              }}
            />

          }
          title={<SearchBar />}
          iconElementRight={
            <FlatButton
              label={this.props.userDetails.get('username')}
              onTouchTap={this.toggleLogOut}
            />
            }
          />
          <Popover
            open={this.props.logOutOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.toggleLogOut}
          >
            <LogOutCard userDetails={this.props.userDetails} />
          </Popover>
        </div>
    );
  }
}

UserAppBar.propTypes = {
  userDetails: React.PropTypes.instanceOf(Map),
  logOutOpen: React.PropTypes.bool
};

export default UserAppBar;

