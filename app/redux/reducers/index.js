import { fromJS } from 'immutable';
import constants from '../constants';

const defaultState = fromJS({
  dialogs: {
    logInOpen: false
  }
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.TOGGLE_LOG_IN:
      return state.updateIn(['dialogs', 'logInOpen'], (currentValue) => {
        return !currentValue;
      });
    default:
      return state;
  }
};

export default reducer;

