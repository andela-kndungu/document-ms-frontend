import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from './components/AppBar.jsx';

// Needed for onTouchTap
injectTapEventPlugin();

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

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

