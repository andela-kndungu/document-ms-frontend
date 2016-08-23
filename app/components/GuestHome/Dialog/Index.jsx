import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LogInTabs from './LogInTabs.jsx';
import { toggleLogInDialog } from '../../../redux/actions';
import store from '../../../redux/store';

const close = () => {
  toggleLogInDialog((action) => {
    store.dispatch(action);
  });
};

const logInDialogActions = [
  <FlatButton
    label="CANCEL"
    primary
    onTouchTap={close}
  />,
];

const LogInDialog = (props) => {
  return (
    <Dialog
      title={<LogInTabs />}
      actions={logInDialogActions}
      modal={false}
      open={props.logInOpen}
      onRequestClose={close}
    />
  );
};

LogInDialog.propTypes = {
  logInOpen: React.PropTypes.bool
};

export default LogInDialog;

