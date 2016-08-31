import { fromJS } from 'immutable';
import { expect } from 'chai';
import constants from '../../../../app/redux/constants';

import authReducer from '../../.././../app/redux/reducers/auth.js';

describe('Reducers :: LOG_IN_USER_SUCCESS', () => {
  const defaultState = fromJS({
    isAuthenticated: false,
  });

  const action = {
    type: constants.LOG_IN_USER_SUCCESS,
    payload: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImZpcnN0IjoiSm9obiIsImxhc3QiOiJEb2UifSwidXNlcm5hbWUiOiJqb2huIiwicGhvdG8iOiJwaG90b1VybCIsImVtYWlsIjoiam9obkBkb2UuY29tIiwicm9sZXMiOlsidXNlciJdLCJfaWQiOiIxMjMifQ.GVZhE3T299nI2d6xjkV8pjUeNy0OhuOfAuDZb0G9rBU'
    }
  };

  const newState = authReducer(defaultState, action);

  it('Returns the initial state', () => {
    expect(authReducer(undefined, { type: 'emptyType' })).to.eql(defaultState);
  });


  it('Updates state with user details', () => {
    expect(newState).to.eql(fromJS({
      isAuthenticated: true,
      userDetails: {
        name: {
          first: 'John',
          last: 'Doe'
        },
        username: 'john',
        photo: 'photoUrl',
        email: 'john@doe.com',
        roles: ['user'],
        _id: '123'
      },
    }));
  });
});

