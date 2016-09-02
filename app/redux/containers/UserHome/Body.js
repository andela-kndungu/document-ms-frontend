import { connect } from 'react-redux';

import Body from '../../../components/home/UserHome/Body/Index.jsx';

const mapStateToProps = (state) => {
  return ({
    documents: state.documents.get('documents'),
    userDetails: state.auth.get('userDetails'),
    searchTerm: state.searchTerm
  });
};

export default connect(mapStateToProps)(Body);

