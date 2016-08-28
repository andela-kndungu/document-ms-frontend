import React from 'react';
import { Map, List } from 'immutable';
import FAB from './FAB.jsx';
import DocumentCard from './DocumentCard.jsx';
import AddDocumentDialog from '../../../../redux/containers/dialogs/AddDocument.js';
// import AddDocumentDialog from './AddDocument/index.jsx';
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
    if (searchTerm === '') {
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

  // All the documents user has requested for
  const documents = props.documents.toJS();

  // Only display documentts containing the search term
  const filteredDocuments = filterDocuments(searchTerm, documents);

  // Convert each document into a document card
  const nodes = filteredDocuments.map((document, index) => {
    const username = props.userDetails.get('username');

    // Will either activate or deactivate the delete button
    const canDelete = document.owner.username === username;

    // To display a green colour for public documents and green otherwise
    const isPublic = document.accessibleBy.indexOf('user') > -1;
    return (
      <DocumentCard
        key={index}
        owner={document.owner}
        title={document.title}
        content={document.content}
        date={document.createdAt}
        category={document.category}
        documentId={document._id}
        canDelete={canDelete}
        isPublic={isPublic}
      />
    );
  });

  return (
    <div style={bodyStyle}>
      {/* Array of DocumentCards */ }
      {nodes}
      { /* Displayed on clicking the FAB */ }
      <AddDocumentDialog />
      {/* Floating action button to add new documents */}
      <FAB />
    </div>
  );
};

Body.propTypes = {
  userDetails: React.PropTypes.instanceOf(Map),
  documents: React.PropTypes.instanceOf(List),
  searchTerm: React.PropTypes.string,
  addDocumentOpen: React.PropTypes.bool,
  history: React.PropTypes.object
};

export default Body;

