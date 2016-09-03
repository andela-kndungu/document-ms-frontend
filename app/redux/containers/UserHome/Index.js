import { connect } from 'react-redux';

import UserHome from '../../../../app/components/Home/UserHome/Index.jsx';

const mapStateToProps = (state) => {
  return ({
    documents: state.documents.get('documents'),
    userDetails: state.auth.get('userDetails'),
    searchTerm: state.searchTerm
  });
};

export default connect(mapStateToProps)(UserHome);

