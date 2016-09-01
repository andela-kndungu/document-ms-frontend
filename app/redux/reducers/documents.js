import { fromJS } from 'immutable';
import constants from '../constants';

// At first all dialogs are not visiible
const defaultState = fromJS({
  documents: [],
  public: []
});

// If state is undefined use default state
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.FETCHED_DOCUMENTS:
      return fromJS({
        documents: action.payload,
        public: []
      });
    case constants.FETCHED_PUBLIC_DOCUMENTS:
      return fromJS({
        public: action.payload,
        documents: []
      });
    default:
      // Always return current state as the default
      return state;
  }
};

export default reducer;

