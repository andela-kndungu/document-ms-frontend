import { createStore, combineReducers } from 'redux';
import dialogsReducer from '../reducers/dialogs.js';
import authReducer from '../reducers/auth.js';
import documentsReducer from '../reducers/documents.js';
import searchTermReducer from '../reducers/searchTerm.js';

const reducers = {
  dialogs: dialogsReducer,
  auth: authReducer,
  documents: documentsReducer,
  searchTerm: searchTermReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default store;

