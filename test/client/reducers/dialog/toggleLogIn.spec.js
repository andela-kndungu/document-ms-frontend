import { fromJS } from 'immutable';
import { expect } from 'chai';
import constants from '../../../../app/redux/constants';
import logInReducer from '../../../../app/redux/reducers/dialogs.js';

describe('Reducers :: TOGGLE_LOG_IN', () => {
  it('Toggles false to true', () => {
    const state = fromJS({
      dialogs: {
        logInOpen: false
      }
    });

    const action = {
      type: constants.TOGGLE_LOG_IN,
    };

    const newState = logInReducer(state, action);

    expect(newState).to.eql(
      fromJS({
        dialogs: {
          logInOpen: true
        }
      })
    );
  });

  it('Toggles true to false', () => {
    const state = fromJS({
      dialogs: {
        logInOpen: true
      }
    });

    const action = {
      type: constants.TOGGLE_LOG_IN,
    };

    const newState = logInReducer(state, action);

    expect(newState).to.eql(
      fromJS({
        dialogs: {
          logInOpen: false
        }
      })
    );
  });
});
