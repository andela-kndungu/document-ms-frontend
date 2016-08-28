import React from 'react';
import Dialog from 'material-ui/Dialog';
import store from '../../../../redux/store';
import Add from '../documents/Add.jsx';

const AddDocuments = () => {
  return (
    <Dialog
      title={<Add />}
      actions={[
        <FlatButton
          label="CANCEL"
          primary
          onTouchTap={() => {
            store.dispatch({ type: 'TOGGLE_ADD_DOCUMENT'  });
          }}
        />
      ]}
      modal={false}
      open={this.props.addDocumentOpen}
      onRequestClose={() => {
        store.dispatch({ type: 'TOGGLE_ADD_DOCUMENT'  });
      }}
    />
  );
};
