import { connect } from 'react-redux';

import AddDocumentTab from
'../../../components/home/UserHome/body/AddDocument/AddDocumentTab.jsx';

const mapStateToProps = (state) => {
  return ({
    categories: state.addDocument.get('categories'),
    userDetails: state.auth.get('userDetails')
  });
};

export default connect(mapStateToProps)(AddDocumentTab);

