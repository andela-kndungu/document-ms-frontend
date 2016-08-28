import { fromJS } from 'immutable';
import jwtDecode from 'jwt-decode';
import constants from '../constants';

// At first all dialogs are not visiible
const defaultState = fromJS({
  documents: []
});

// If state is undefined use default state
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.LOG_IN_SUCCESS:
      return fromJS({
        isAuthenticated: true,
        userDetails: jwtDecode(action.payload.token)
      });
    default:
      // Always return current state as the default
      return state;
  }
};

export default reducer;

