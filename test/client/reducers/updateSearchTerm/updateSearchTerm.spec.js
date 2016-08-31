import { expect } from 'chai';
import constants from '../../../../app/redux/constants';

import updateTermReducer from '../../.././../app/redux/reducers/updateSearchTerm.js';

describe('Reducers :: FETCHED_TAGS', () => {
  const defaultState = '';

  const action = {
    type: constants.UPDATE_SEARCH_TERM,
    payload: 'newTerm'
  };

  const newState = updateTermReducer(defaultState, action);

  it('Returns the initial state', () => {
    expect(updateTermReducer(undefined, { type: 'emptyType' }))
      .to.eql(defaultState);
  });


  it('Updates state with user details', () => {
    expect(newState).to.equal('newTerm');
  });
});

