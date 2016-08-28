import { fromJS } from 'immutable';
import constants from '../constants';

// At first all dialogs are not visiible
const defaultState = fromJS({
  dialogs: {
    logInOpen: false,
    logOutOpen: false,
    addDocumentOpen: false
  }
});

// If state is undefined use default state
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.TOGGLE_LOG_IN:
      // Negate the current value, i.e. if open close
      return state.updateIn(['dialogs', 'logInOpen'], (currentValue) => {
        return !currentValue;
      });
    case constants.TOGGLE_LOG_OUT:
      // Negate the current value, i.e. if open close
      return state.updateIn(['dialogs', 'logOutOpen'], (currentValue) => {
        return !currentValue;
      });
    case constants.TOGGLE_ADD_DOCUMENT:
      // Negate the current value, i.e. if open close
      return state.updateIn(['dialogs', 'addDocumentOpen'], (currentValue) => {
        return !currentValue;
      });
    default:
      // Always return current state as the default
      return state;
  }
};

export default reducer;

