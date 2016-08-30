import React from 'react';
import { Map, List } from 'immutable';
import DocumentCard from './DocumentCard.jsx';

const bodyStyle = {
  paddingTop: '64px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  justifyContent: 'center',
  flexDirection: 'row'
};

const Body = (props) => {
  // All public documents
  const documents = props.documents.toJS();

  // Convert each document that should be displayed into a document card
  const nodes = documents.map((document, index) => {
    return (
      <DocumentCard
        key={index + Math.random()}
        owner={document.owner}
        title={document.title}
        content={document.content}
        date={document.createdAt}
        tag={document.tags[0]}
      />
    );
  });

  return (
    <div style={bodyStyle}>
      {/* Array of DocumentCards */ }
      {nodes}
    </div>
  );
};

Body.propTypes = {
  documents: React.PropTypes.instanceOf(List),
  searchTerm: React.PropTypes.string,
  userDetails: React.PropTypes.instanceOf(Map),
  updatedSnackbarOpen: React.PropTypes.bool
};

export default Body;

