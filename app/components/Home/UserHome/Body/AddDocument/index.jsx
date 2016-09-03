import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddDocumentTab from '../../../../../redux/containers/addDocument/index.js';
import store from '../../../../../redux/store';

const AddDocumentDialog = (props) => {
  return (
    <Dialog
      title={<AddDocumentTab />}
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
      open={props.addDocumentOpen}
      onRequestClose={() => {
        store.dispatch({ type: 'TOGGLE_ADD_DOCUMENT' });
      }}
    />
  );
};

AddDocumentDialog.propTypes = {
  addDocumentOpen: React.PropTypes.bool
};

export default AddDocumentDialog;

