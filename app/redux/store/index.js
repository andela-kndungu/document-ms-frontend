import { createStore, combineReducers } from 'redux';
import dialogsReducer from '../reducers/dialogs.js';

const reducers = {
  dialogs: dialogsReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default store;

