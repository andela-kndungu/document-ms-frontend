import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import store from '../../../../redux/store';
import { toggleAddDocument } from '../../../../redux/actions';

const fabStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  zIndex: '1'
};

const FAB = () => {
  return (
    <FloatingActionButton
      onTouchTap={() => {
        // On clicking toggle display status of add `document` dilaog
        toggleAddDocument((action) => {
          store.dispatch(action);
        });
      }}
      style={fabStyle}
      secondary
    >
      <ContentAdd />
    </FloatingActionButton>
  );
};

export default FAB;

