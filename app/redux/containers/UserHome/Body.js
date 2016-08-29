import { connect } from 'react-redux';

import Body from '../../../components/home/UserHome/body/index.jsx';

const mapStateToProps = (state) => {
  return ({
    documents: state.documents.get('documents'),
    userDetails: state.auth.get('userDetails')
  });
};

export default connect(mapStateToProps)(Body);

