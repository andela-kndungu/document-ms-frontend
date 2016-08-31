import { fromJS } from 'immutable';
import { expect } from 'chai';
import constants from '../../../../app/redux/constants';
import reducer from '../../../../app/redux/reducers/dialogs.js';

describe('Reducers :: TOGGLE_ADD_DOCUMENT', () => {
  it('Toggles false to true', () => {
    const state = fromJS({
      dialogs: {
        addDocumentOpen: false
      }
    });

    const action = {
      type: constants.TOGGLE_ADD_DOCUMENT
    };

    const newState = reducer(state, action);

    expect(newState).to.eql(
      fromJS({
        dialogs: {
          addDocumentOpen: true
        }
      })
    );
  });

  it('Toggles true to false', () => {
    const state = fromJS({
      dialogs: {
        addDocumentOpen: true
      }
    });

    const action = {
      type: constants.TOGGLE_ADD_DOCUMENT
    };

    const newState = reducer(state, action);

    expect(newState).to.eql(
      fromJS({
        dialogs: {
          addDocumentOpen: false
        }
      })
    );
  });
});
