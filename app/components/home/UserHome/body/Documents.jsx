import React from 'react';
import DocumentCard from './DocumentCard.jsx';

const filterDocuments = (searchTerm, documents) => {
  return documents.filter((document) => {
    if (searchTerm === '') {
      return true;
    }

    const inTitle = document.title.toLowerCase().indexOf(searchTerm);
    const inContent = document.content.toLowerCase().indexOf(searchTerm);

    return inTitle > -1 || inContent > -1;
  });
};


const Documents = (props) => {
  const searchTerm = props.searchTerm;
  const documents = props.documents.toJS();
  const filteredDocuments = this.filterDocuments(searchTerm, documents);
  const nodes = filteredDocuments.map((document, index) => {
    const canDelete = document.owner.username === this.props.userDetails.get('username');
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

  return nodes
};
export default nodes;

