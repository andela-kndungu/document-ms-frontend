import { fromJS } from 'immutable';
import { expect } from 'chai';
import constants from '../../../../app/redux/constants';

import documentsReducer from '../../.././../app/redux/reducers/documents.js';

describe('Reducers :: FETCHED_DOCUMENTS', () => {
  const defaultState = fromJS({
    documents: [],
    public: []
  });

  const action = {
    type: constants.FETCHED_DOCUMENTS,
    payload: [{ title: 'firstDocument' }, { title: 'secondDocument' }]
  };

  const newState = documentsReducer(defaultState, action);

  it('Returns the initial state', () => {
    expect(documentsReducer(undefined, { type: 'emptyType' }))
      .to.eql(defaultState);
  });


  it('Updates state with fetched documents', () => {
    expect(newState).to.eql(
      fromJS({
        documents: [
          { title: 'firstDocument' },
          { title: 'secondDocument' }
        ],
        public: []
      })
  );
  });
});

