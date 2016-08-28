import constants from '../constants';

// At first the search term is an empty string
const defaultState = '';

// If state is undefined use default state
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SEARCH_TERM:
      // Simply return the new search term
      return action.payload;
    default:
      // Always return current state as the default
      return state;
  }
};

export default reducer;

