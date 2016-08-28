import { connect } from 'react-redux';

import UserHome from '../../../../app/components/home/UserHome/Index.jsx';

const mapStateToProps = (state) => {
  return ({
    documents: state.documents.get('documents'),
  });
};

export default connect(mapStateToProps)(UserHome);

