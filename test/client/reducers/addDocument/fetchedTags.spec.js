import { fromJS } from 'immutable';
import { expect } from 'chai';
import constants from '../../../../app/redux/constants';

import addDocumentReducer from '../../.././../app/redux/reducers/addDocument.js';

describe('Reducers :: FETCHED_TAGS', () => {
  const defaultState = fromJS({
    tags: []
  });

  const action = {
    type: constants.FETCHED_TAGS,
    payload: [{ title: 'firstTag' }, { title: 'secondTag' }]
  };

  const newState = addDocumentReducer(defaultState, action);

  it('Returns the initial state', () => {
    expect(addDocumentReducer(undefined, { type: 'emptyType' }))
      .to.eql(defaultState);
  });


  it('Updates state with user details', () => {
    expect(newState).to.eql(
      fromJS({
        tags: [
          { title: 'firstTag' },
          { title: 'secondTag' }
        ]
      })
  );
  });
});

