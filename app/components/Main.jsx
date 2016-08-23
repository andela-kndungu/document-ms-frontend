import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from './GuestHome/AppBar.jsx';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#607D8B',
    accent1Color: '#00BCD4',
  },
});

const App = () => {
  { /* Provide the same theme to the entire app */ }
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <AppBar />
    </MuiThemeProvider>
  );
};

export default App;

