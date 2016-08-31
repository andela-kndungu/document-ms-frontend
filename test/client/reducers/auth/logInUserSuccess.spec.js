import { fromJS } from 'immutable';
import { expect } from 'chai';
import constants from '../../../../app/redux/constants';

import authReducer from '../../.././../app/redux/reducers/auth.js';

describe('Reducers :: LOG_OUT_USER', () => {
  const defaultState = fromJS({
    isAuthenticated: true
  });

  const action = {
    type: constants.LOG_OUT_USER
  };

  const newState = authReducer(defaultState, action);

  it('Sets isAuthenticated to false', () => {
    expect(newState).to.eql(fromJS({
      isAuthenticated: false
    }));
  });
});

