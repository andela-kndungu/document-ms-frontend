import { fromJS } from 'immutable';
import { expect } from 'chai';
import constants from '../../../../app/redux/constants';

import documentsReducer from '../../.././../app/redux/reducers/documents.js';

describe('Reducers :: FETCHED_PUBLIC_DOCUMENTS', () => {
  const defaultState = fromJS({
    documents: [],
    public: []
  });

  const action = {
    type: constants.FETCHED_PUBLIC_DOCUMENTS,
    payload: [{ title: 'firstDocument' }, { title: 'secondDocument' }]
  };

  const newState = documentsReducer(defaultState, action);

  it('Updates state with fetched documents', () => {
    expect(newState).to.eql(
      fromJS({
        documents: [],
        public: [
          { title: 'firstDocument' },
          { title: 'secondDocument' }
        ]
      })
  );
  });
});

