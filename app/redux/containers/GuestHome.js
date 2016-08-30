import { connect } from 'react-redux';

import GuestHome from '../../components/home/GuestHome/Index.jsx';

const mapStateToProps = (state) => {
  return ({
    publicDocuments: state.documents.get('public')
  });
};

export default connect(mapStateToProps)(GuestHome);

