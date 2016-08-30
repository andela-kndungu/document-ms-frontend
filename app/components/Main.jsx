import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Home from '../redux/containers/Home.jsx';
import { oauthToken } from '../login';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#607D8B',
    accent1Color: '#00BCD4',
  },
});

const Main = (props) => {
  // Check whether token is provided in the url
  if (oauthToken(props.location.query.token)) {
    // If it is process and redirect to home url
    props.history.push('/');
  }

  { /* Provide the same theme to the entire app */ }
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Home />
    </MuiThemeProvider>
  );
};

Main.propTypes = {
  location: React.PropTypes.shape({
    query: React.PropTypes.shape({
      token: React.PropTypes.string
    })
  }),
  history: React.PropTypes.object
};

export default Main;

