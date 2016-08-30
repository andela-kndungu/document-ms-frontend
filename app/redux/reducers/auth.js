import { fromJS } from 'immutable';
import jwtDecode from 'jwt-decode';
import constants from '../constants';

// At first all dialogs are not visiible
const defaultState = fromJS({
  auth: {
    isAuthenticated: false,
  }
});

// If state is undefined use default state
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.LOG_IN_USER_SUCCESS:
      // Get info from token and store it
      return fromJS({
        isAuthenticated: true,
        userDetails: jwtDecode(action.payload.token)
      });
    case constants.LOG_OUT_USER:
      // Get info from token and store it
      return fromJS({
        isAuthenticated: false
      });
    default:
      // Always return current state as the default
      return state;
  }
};

export default reducer;

