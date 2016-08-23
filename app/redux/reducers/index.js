import { fromJS } from 'immutable';

const defaultState = fromJS({
  dialogs: {}
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;

