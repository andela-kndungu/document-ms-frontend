import { createStore, combineReducers } from 'redux';
import dialogsReducer from '../reducers/dialogs.js';
import authReducer from '../reducers/auth.js';
import documentsReducer from '../reducers/documents.js';
import searchTermReducer from '../reducers/searchTerm.js';
import addDocumentReducer from '../reducers/addDocument.js';

const reducers = {
  dialogs: dialogsReducer,
  auth: authReducer,
  documents: documentsReducer,
  searchTerm: searchTermReducer,
  addDocument: addDocumentReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export default store;

