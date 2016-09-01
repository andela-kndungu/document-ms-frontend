import React from 'react';
import { Map, List } from 'immutable';
import Fab from './FAB.jsx';
import DocumentCard from './DocumentCard.jsx';
import AddDocumentDialog from '../../../../redux/containers/dialogs/AddDocument.js';

const bodyStyle = {
  paddingTop: '64px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  justifyContent: 'center',
  flexDirection: 'row'
};

const filterDocuments = (searchTerm, documents) => {
  return documents.filter((document) => {
    // If no search term return all the documents
    if (!searchTerm) {
      return true;
    }

    // Only return documents with the search term in the title or body
    const inTitle = document.title.toLowerCase().indexOf(searchTerm);
    const inContent = document.content.toLowerCase().indexOf(searchTerm);

    return inTitle > -1 || inContent > -1;
  });
};

const Body = (props) => {
  // Term typed in the search bar
  const searchTerm = props.searchTerm;

  // All the documents user has requested for from the db
  const documents = props.documents ? props.documents.toJS() : [];

  // Only display documentts containing the search term
  const filteredDocuments = filterDocuments(searchTerm, documents);

  // Convert each document that should be displayed into a document card
  const nodes = filteredDocuments.map((document, index) => {
    // To determine whether delete button should be active
    const username = props.userDetails.get('username');

    // Will either activate or deactivate the delete button
    const canDelete = document.owner.username === username;

    // To display a green colour for public documents and blue otherwise
    const isPublic = document.accessibleBy.indexOf('user') > -1;

    return (
      <DocumentCard
        key={index + Math.random()}
        owner={document.owner}
        title={document.title}
        content={document.content}
        date={document.createdAt}
        tag={document.tags[0]}
        documentId={document._id}
        canDelete={canDelete}
        isPublic={isPublic}
      />
    );
  });

  return (
    <div style={bodyStyle}>
      {/* Array of DocumentCards */}
      {nodes}
      {/* Displayed on clicking the FAB */}
      <AddDocumentDialog />
      {/* Floating action button to add new documents */}
      <Fab />
    </div>
  );
};

Body.propTypes = {
  documents: React.PropTypes.instanceOf(List),
  searchTerm: React.PropTypes.string,
  userDetails: React.PropTypes.instanceOf(Map),
};

export default Body;

