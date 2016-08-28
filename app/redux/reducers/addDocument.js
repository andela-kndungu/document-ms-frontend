import { fromJS } from 'immutable';
import constants from '../constants';

// Before fetching from server there are no categories
const defaultState = fromJS({
  categories: []
});

// If state is undefined use default state
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.FETCHED_DOCUMENTS:
      // Convert payload to List and update value in state
      return state.update('categories', () => {
        return fromJS(action.payload);
      });
    default:
      // Always return current state as the default
      return state;
  }
};

export default reducer;

