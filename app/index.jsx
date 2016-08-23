import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';

import Main from './components/Main.jsx';
import store from './redux/store';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
    </Router>
  </Provider>, document.getElementById('app')
);
