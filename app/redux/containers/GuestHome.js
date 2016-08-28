import { connect } from 'react-redux';

import GuestHome from '../../components/home/GuestHome/Index.jsx';

const mapStateToProps = (state) => {
  return ({
    documents: state.documents.get('documents')
  });
};

export default connect(mapStateToProps)(GuestHome);

