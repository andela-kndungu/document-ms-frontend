import request from 'superagent';
import constants from '../constants';

// Append url base to be able to mock requests with nock when testing
const urlPrefix = process.env.NODE_ENV ===
  'test' ? 'http://localhost:8181/' : '';

// Toggles the log in dialog display boolean
const toggleLogInDialog = (callback) => {
  return callback({
    type: constants.TOGGLE_LOG_IN
  });
};

// Fetches all documents accessible by a logged in user
const fetchDocuments = (token, query, callback) => {
  request.get(`${urlPrefix}api/documents`)
    .query(query)
    .set('x-access-token', token)
    .end((error, response) => {
      return callback({
        type: constants.FETCHED_DOCUMENTS,
        payload: response.body
      });
    });
};

// Toggles the log out dialog display boolean
const toggleLogOutDialog = (callback) => {
  return callback({
    type: constants.TOGGLE_LOG_OUT
  });
};

// Toggles the add document dialog display boolean
const toggleAddDocument = (callback) => {
  return callback({
    type: constants.TOGGLE_ADD_DOCUMENT
  });
};

// Fetches all tags created so far
const fetchTags = (token, callback) => {
  request.get(`${urlPrefix}api/tags`)
    .set('x-access-token', token)
    .end((error, response) => {
      return callback({
        type: constants.FETCHED_TAGS,
        payload: response.body
      });
    });
};

// Fetches all public documents
const fetchPublicDocuments = (callback) => {
  request.get(`${urlPrefix}api/documents/public`)
    .end((error, response) => {
      return callback({
        type: constants.FETCHED_PUBLIC_DOCUMENTS,
        payload: response.body
      });
    });
};

// Stores value typed into search bar
const updateSearchTerm = (value, callback) => {
  callback({
    type: constants.UPDATE_SEARCH_TERM,
    payload: value
  });
};

export {
  toggleLogInDialog,
  fetchDocuments,
  toggleLogOutDialog,
  toggleAddDocument,
  fetchTags,
  fetchPublicDocuments,
  updateSearchTerm
};

