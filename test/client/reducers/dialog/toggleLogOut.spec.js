import { fromJS } from 'immutable';
import { expect } from 'chai';
import constants from '../../../../app/redux/constants';
import reducer from '../../../../app/redux/reducers/dialogs.js';

describe('Reducers :: TOGGLE_LOG_OUT', () => {
  it('Toggles false to true', () => {
    const state = fromJS({
      dialogs: {
        logOutOpen: false
      }
    });

    const action = {
      type: constants.TOGGLE_LOG_OUT,
    };

    const newState = reducer(state, action);

    expect(newState).to.eql(
      fromJS({
        dialogs: {
          logOutOpen: true
        }
      })
    );
  });

  it('Toggles true to false', () => {
    const state = fromJS({
      dialogs: {
        logOutOpen: true
      }
    });

    const action = {
      type: constants.TOGGLE_LOG_OUT,
    };

    const newState = reducer(state, action);

    expect(newState).to.eql(
      fromJS({
        dialogs: {
          logOutOpen: false
        }
      })
    );
  });
});
